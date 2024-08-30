"use client";
import { useState, useEffect } from "react";
import cookie from 'js-cookie'
import { useStore } from "../../store/store";

interface ChargeProps {
    economyCharge: number,
}

export default function Price({economyCharge}:ChargeProps) {
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
        //로그인을 하면 두번째 p태그에 할인가격 표출
        <div>
            <p>{economyCharge} 원</p>
            <p></p>
        </div>
    )
}