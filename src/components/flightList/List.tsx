import axios from "axios";
import styles from '../../styles/flightList/flightList.module.css';
import direction from '@/../public/images/direction.svg';
import Image from "next/image";
import Pay from "./pay";
import Price from "./price";
import AirLine from "./AirLine";
import searchIcon from '@/../public/images/searchIcon.svg';
import SearchedNone from "./SearchedNone";

interface flight {
    economyCharge: number,
    depPlandTime: string,
    arrPlandTime: string,
    prestigeCharge: number,
    vihicleId: string,
    airlineNm: string,
}

export default async function FlightList({param}:any) {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = ("0"+(currentTime.getMonth()+1)).slice(-2);
    const day = currentTime.getDate().toString().padStart(2, '0');
    const hours = ("0"+currentTime.getHours()).slice(-2);
    const minutes = ("0"+currentTime.getMinutes()).slice(-2);
    const formattedTime = `${year}${month}${day}${hours}${minutes}`;

    const res = await axios.get(`http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=${process.env.NEXT_FLIGHT_API_KEY}&numOfRows=100&depAirportId=${param.depCity}&arrAirportId=${param.arrCity}&depPlandTime=${param.date}`);
    const list:flight[] = await res.data.response.body.items.item;
    //economyCharge가 있고 이미 시간이 지난 비행편 제외
    const filteredList = list.filter(data => data.economyCharge != null && parseInt(data.depPlandTime)>parseInt(formattedTime));
    //승객 수(quantity)보다 비행편의 남은 자리 수가 더 적은 비행편 제외
    const realList = await Promise.all(filteredList.map(async data => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/seat/num/${param.date + data.vihicleId}`);
        const res1 = response.data;
        if (res1 === 0 || res1 >= param.quantity) {
            return data;
        }
        else
            return null;
    }));
    //realList에서 null이 된(조건에서 제외된) 항공편 필터링
    const list2 = realList.filter((item)=>item!==null);
    
    return (
        <div className={styles.flightItemWrapper}>
            <div className={styles.flightsHeader}>
                <div>항공사</div>
                <div>항공편</div>
                <div>출발</div>
                <div></div>
                <div>도착</div>
                <div>가격</div>
                <div>진행</div>
            </div>
            {list2 && list2.length > 0 ? (
                list2.map((data, index)=>{
                    return(
                        <div className={styles.flightItem} key={index}>
                            <AirLine airlineNm={data.airlineNm} flightCode="" height={80}/>
                            <div>
                                <span style={{fontWeight:"600"}}>{data.vihicleId}</span>
                            </div>
                            <div>
                                <div className={styles.fromTo}>
                                    <p>{param.korDep}</p>
                                    <p>{data.depPlandTime.toString().slice(8,10)}시 {data.depPlandTime.toString().slice(10)}분</p>
                                </div>
                            </div>
                            <div>
                                <Image src={direction} alt="direction"/>
                            </div>
                            <div>
                                <div className={styles.fromTo}>
                                    <p>{param.korArr}</p>
                                    <p>{data.arrPlandTime.toString().slice(8,10)}시 {data.arrPlandTime.toString().slice(10)}분</p>
                                </div>
                            </div>
                            {/* <Price economyCharge={data.economyCharge} prestigeCharge={data.prestigeCharge}/> */}
                            <Price economyCharge={data.economyCharge}/>
                            <Pay planeId={formattedTime.slice(0, 8) + data.vihicleId} depTime={data.depPlandTime} arrTime={data.arrPlandTime} date={param.date} airLine={data.airlineNm} depCity={param.korDep} arrCity={param.korArr} msg="예약하기"/>   
                        </div>
                    )    
                })
            ) : (
                <SearchedNone/>
            )}
        </div>
    )
}