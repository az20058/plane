"use client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useStore } from "@/store/store";
import BlueButton from "@/containers/BluButton";

interface FlightProps {
    planeId: string,
    depTime: string,
    arrTime: string,
    date: string,
    airLine: string,
    depCity: string,
    arrCity: string,
    msg: string
}

export default function Pay({planeId, depTime, arrTime, date, airLine, depCity, arrCity, msg}:FlightProps) {
    const param = useSearchParams();
    const quantity = param.get("quantity");
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

        router.push(`/reservation/?id=${id}&quantity=${quantity}`);
    }

    return (
        <BlueButton handleSubmit={processPay} msg={msg}/>
    )
}