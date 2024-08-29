import axios from "axios";
import styles from '../../styles/flightList/flightList.module.css';
import Price from "@/app/flightList/price";
import Pay from "@/app/flightList/pay";

interface flight {
    economyCharge: number,
    depPlandTime: string,
    arrPlandTime: string,
    prestigeCharge: number,
    vihicleId: string,
    airlineNm: string,
    depAirportNm: string,
    arrAirportNm: string,
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
        const response = await axios.get(`${process.env.NEXT_SERVER_URL}/seat/num/${param.date + data.vihicleId}`);
        const res1 = response.data;
        console.log(res1);
        console.log(param.date+data.vihicleId);
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
                            <div>
                                <span className={styles.airLine}>{data.airlineNm}</span>
                            </div>
                            <div className={styles.flexTime}>
                                <div className="fromTo">
                                    <div>{data.depAirportNm}</div>
                                    <div>{data.depPlandTime.toString().slice(-4)}</div>
                                </div>
                                <div className={styles.arrow}></div>
                                <div>
                                    <div>{data.arrAirportNm}</div>
                                    <div>{data.arrPlandTime.toString().slice(-4)}</div>
                                </div>
                            </div>
                            {/* <Price economyCharge={data.economyCharge} prestigeCharge={data.prestigeCharge}/> */}
                            <div>
                                <Price economyCharge={data.economyCharge} prestigeCharge={data.prestigeCharge}/>
                            </div>
                            <Pay planeId={formattedTime + data.vihicleId} depTime={data.depPlandTime} arrTime={data.arrPlandTime} date={param.date} airLine={data.airlineNm} depCity={param.korDep} arrCity={param.korArr}/>
                        </div>
                    )    
                })
            ) : (
                <div>&quot;{param.depCity}행 ~ {param.arrCity}행&quot;에 대한 검색 결과가 없습니다.</div>
            )}
        </div>
    )
}