"use client";
import { Button } from "react-bootstrap";
import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/store";


export default function finalRes(props:any) {
    const router = useRouter();
    const param = props.searchParams;
    const [depTime, setDepTime] = useState(null);
    const [arrTime, setArrTime] = useState(null);
    const [seatCode, setSeatCode] = useState(null);
    const [date, setDate] = useState(null);
    const [date2, setDate2] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isLogin, setIsLogin] = useState(null);
    let seatNum;
    //selectedSeatsId를 map함수를 통해 좌석들의 정보를 get해온다.
    console.log(param.selectedSeatsId);
    const {quantity} = useStore();
    const [passengers, setPassengers] = useState([]);
    console.log(cookie.get("username"));
    const [currentTime, setCurrentTime] = useState('');
    console.log(passengers);
    
    return (
        <></>
    )
}