"use client";
import { useRouter } from "next/navigation";
import { useStore } from '../../store/store';
import axios from "axios";

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
        const res = await axios.post(``, {
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

        router.push(`/reservation/${id}`);
    }

    return (
        <></>
    )
}