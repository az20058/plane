"use client";
import { useState, useEffect } from "react";
import cookie from 'js-cookie'

interface ChargeProps {
    economyCharge: number,
    prestigeCharge: number
}

export default function Price({economyCharge, prestigeCharge}:ChargeProps) {
    const [isLogin, setIsLogin] = useState<string|undefined>(undefined);

    useEffect(()=>{
        setIsLogin(cookie.get("isLogin"));
    }, [])

    return (
        <></>
    )
}