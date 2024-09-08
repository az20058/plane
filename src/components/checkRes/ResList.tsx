import AirLine from "@/components/flightList/AirLine"
import styles from '@/styles/checkRes/checkRes.module.css';
import Image from "next/image";
import direction from '@/../public/images/direction.svg';
import Price from "@/components/flightList/price";
import Pay from "@/components/flightList/pay";
import axios from "axios";
import { cookies } from "next/headers";
import CheckSeat from "@/components/checkRes/CheckSeat";

interface ResProps {
    buyTime: string;
    seatCode: string;
    payPrice: string;
    depTime: string;
    arrTime: string;
    flightId: string;
    depCity: string;
    arrCity: string;
    airLine: string;
    resKey: string;
    flightNum: number;
    seatNum: number;
}

export default async function ResList() {
    const cookie = cookies();
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/find/ID/${cookie.get("username")?.value}`);
    const data: ResProps[] = await res.data;

    const groupData = data.reduce((group: { [key: string]: ResProps[] }, item: ResProps) => {
        const { resKey } = item;
        if (!group[resKey]) {
            group[resKey] = [];
        }
        group[resKey].push(item);
        return group;
    }, {});

    return (
        <div className={styles.flightItemWrapper}>
            <div className={styles.flightsHeader}>
                <div>구매 일시</div>
                <div>좌석</div>
                <div>항공사</div>
                <div>출발</div>
                <div></div>
                <div>도착</div>
                <div>가격</div>
                <div>비고</div>
            </div>
            {Object.entries(groupData).map(([resKey, items], index) => (
                <div key={resKey} className={styles.groupFlightItem}>
                    {items.map((item, idx) => {
                        const hour = parseInt(item.buyTime.slice(11, 13)) > 12
                            ? parseInt(item.buyTime.slice(11, 13)) - 12
                            : item.buyTime.slice(11, 13);
                        
                        return (
                            <div key={idx} className={styles.flightItem}>
                                <div>
                                    <span>{item.buyTime.split("-").join(". ").slice(0, 12)}</span>
                                    <span>{parseInt(item.buyTime.slice(11, 13)) > 12 ? "오후 " : "오전 "}{hour + item.buyTime.slice(13, 16)}</span>
                                </div>
                                <div>
                                    <span>{item.seatCode}</span>
                                    <CheckSeat flightId={item.flightNum} seatNum={items.map(item=>item.seatNum)} seatCode={items.map(item=>item.seatCode)}/>
                                </div>
                                <AirLine airlineNm={item.airLine} flightCode={item.flightId.slice(8)} height={36} />
                                <div>
                                    <div className={styles.fromTo}>
                                        <p>{item.depCity}</p>
                                        <p>{item.depTime.slice(8, 10)}시 {item.depTime.slice(10, 12)}분</p>
                                    </div>
                                </div>
                                <div>
                                    <Image src={direction} alt="direction" width={110} />
                                </div>
                                <div>
                                    <div className={styles.fromTo}>
                                        <p>{item.arrCity}</p>
                                        <p>{item.arrTime.slice(8, 10)}시 {item.arrTime.slice(10, 12)}분</p>
                                    </div>
                                </div>
                                <Price economyCharge={parseInt(item.payPrice)} />
                                <Pay msg="환불 신청" />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    )
}