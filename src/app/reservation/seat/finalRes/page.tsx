"use client";
import styles from '@/styles/reservation/finalRes.module.css';
import axios from "axios";
import vectorGray from '@/../public/images/vectorGray.svg';
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import Header from '@/components/Headers/Header';
import Image from 'next/image';
import NextBtn from '@/components/Buttons/NextBtn';

interface PassengerForm {
    num: number,
    name: string,
    email: string,
    nationality?: string,
    birth?: string,
    gender?: string,
    seatCode?: string
}

export default function FinalRes(props:any) {
    const router = useRouter();
    const param = props.searchParams;
    const quantity = parseInt(param.quantity);
    const [passengers, setPassengers] = useState<PassengerForm[]>([]);

    async function handleSubmit() {
        for(let passenger of passengers) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/checkRes/${passenger.num}`);
            const data = await res.data;
            if(data==false){
                return;
            }
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/getCode`);
        const resKey = await res.data;

        for(let passenger of passengers) {
            axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/seat/reservation/${passenger.num}`, {
                ...passenger,
                resKey
            })
            .catch(()=>{
                return;
            })
        }

        alert("예약되었습니다.");
        router.replace('/');
    }

    useEffect(()=>{
        const temp = [];
        
        for(let i=0;i<quantity;i++) {
            const firstname = cookie.get("firstName"+i)||"";
            const lastname = cookie.get("lastName"+i)||"";
            const name = firstname + " " + lastname;
            const email = cookie.get("email"+i)||"";
            const nationality = cookie.get("nationality"+i);
            const birth = cookie.get("birth"+i);
            const gender = cookie.get("gender"+i);
            const seatCode = cookie.get("seatCode"+i);
            const num = !Array.isArray(param.selectedSeatsId)?param.selectedSeatsId:param.selectedSeatsId[i];
            const username = cookie.get("username")||cookie.get("email0");

            const passenger = {
                num,
                username,
                name,
                email,
                nationality,
                birth,
                gender,
                seatCode
            }

            temp.push(passenger);
        }

        setPassengers(temp);
    }, [])
    
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.contentWrapper}>
                <Header msg1='#내티켓' msg2='예매 상세정보' msg3='구매 정보 중 탑승객 정보를 유의해 확인하시길 바랍니다'/>
                <div className={styles.fromToWrapper}>
                    <div className={styles.fromTo}>
                        <span>2024/08/15 06시 05분 | 인천국제공항</span>
                        <Image src={vectorGray} alt='grayVector'/>
                        <span>2024/08/15 06시 05분 | 인천국제공항</span>
                    </div>
                </div>
                <div className={styles.passengers}>
                    {
                        passengers.map((item, index)=>(
                            <div key={index} className={styles.passenger}>
                                <div className={styles.passengerNum}>
                                    <span>탑승객 {index+1}</span>
                                </div>
                                <div className={styles.passengerBody}>
                                    <span>이름 | {item.name.toUpperCase()}</span>
                                    <span>이메일 | {item.email}</span>
                                    <span>국적 | {item.nationality}</span>
                                    <span>생년월일 | {item.birth}</span>
                                    <span>성별 | {item.gender}</span>
                                    <span>좌석 | {item.seatCode}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.footer}>
                    <div>
                        <span>마지막으로, 탑승객 정보가 맞다면 '확정하기'를 눌러주세요</span>
                    </div>
                    <div className={styles.line}/>
                </div>
                <NextBtn handleSubmit={handleSubmit} msg='예약 확정하기'/>
            </div>
        </div>
    )
}