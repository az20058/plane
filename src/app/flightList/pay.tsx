import { redirect } from "next/navigation";
import { useStore } from '../store';
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

export default function Pay(props: any, {planeId, depTime, arrTime, date, airLine, depCity, arrCity}:FlightProps) {
    const {price} = useStore();
    const param = props.searchParams;

    //console.log(flightId);
    async function processPay(){
        const res = await axios.post(``, {
            airLine,
            flightId: planeId,
            depTime,
            arrTime,
            payPrice: price,
            depCity,
            arrCity
        });
        const id = await res.data;

        redirect(`/reservation/${id}`);
    }

    return (
        <></>
    )
}