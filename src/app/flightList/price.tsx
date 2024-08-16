"use client";
import { useState, useEffect } from "react";
import cookie from 'js-cookie'
import { useStore } from "../store";

interface ChargeProps {
    economyCharge: number,
    prestigeCharge: number
}

export default function Price({economyCharge, prestigeCharge}:ChargeProps) {
    const {setPrice} = useStore();
    const [charge, setCharge] = useState<number>(economyCharge);

    useEffect(()=>{
        if(cookie.get("isLogin")==="true"){
            setCharge(charge*0.9);
            setPrice(charge*0.9);
        }
        else {
            setPrice(charge);
        }
    }, [])

    return (
        //charge 노출
        <></>
    )
}