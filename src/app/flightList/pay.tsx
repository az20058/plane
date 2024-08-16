import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from '../store';

interface FlightProps {
    flightId: string,
    depTime: string,
    arrTime: string,
    date: string,
    airLine: string,
    prestigeCharge: number,
    economyCharge: number
}

export default function Pay({flightId, depTime, arrTime, date, airLine, prestigeCharge, economyCharge}:FlightProps) {
    
    //console.log(flightId);
    function processPay(){
        redirect(`/reservation/${date+flightId.toString()}`);
    }

    return (
        <></>
    )
}