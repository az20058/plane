"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useStore } from "@/store/store";

interface FlightProps {
    planeId: string,
    depTime: string,
    arrTime: string,
    date: string,
    airLine: string,
    depCity: string,
    arrCity: string
}

export default function Pay({planeId, depTime, arrTime, date, airLine, depCity, arrCity}:FlightProps) {
    const {price} = useStore();
    const router = useRouter();

    //console.log(flightId);
    async function processPay(){
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/flight`, {
            airLine,
            date,
            flightId: planeId,
            depTime,
            arrTime,
            payPrice: price,
            depCity,
            arrCity
        });
        const id = await res.data;

        router.push(`/reservation/?id=${id}`);
    }

    return (
        <div>
            <button onClick={processPay}
            style={{backgroundColor:"#2067D1", color:"white", borderRadius:"9px", padding:"12px 20px", fontSize:"18px",
            fontFamily:"Pretendard", fontWeight:"700"
            }}>예약하기</button>
        </div>
    )
}