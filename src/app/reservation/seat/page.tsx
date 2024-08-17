"use client";
import { useStore } from "@/app/store";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Seat(props:any) {
    const {quantity} = useStore();
    const [data, setData] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [selectedSeatsId, setSelectedSeatsId] = useState<number[]>([]);
    const router = useRouter();
    const param = useSearchParams();
    const type = param.get("type");
    const [seats, setSeats] = useState(null);
    const [count, setCount] = useState<number>(quantity);

    function isSeatSelected(seatIndex:number):boolean {
        return selectedSeats.includes(seatIndex);
    }

    function handleReservation(i:number, id:number) {
        if (isSeatSelected(i)) {
            const newSelectedSeats = selectedSeats.filter(seat => seat !== i);
            const newSelectedSeatsId = selectedSeatsId.filter(seatId => seatId !== id);

            setSelectedSeats(newSelectedSeats);
            setSelectedSeatsId(newSelectedSeatsId);
            setCount(prevCount => prevCount + 1);
        } else if (count > 0) {
            setSelectedSeats([...selectedSeats, i]);
            setSelectedSeatsId([...selectedSeatsId, id]);
            setCount(prevCount => prevCount - 1);
        } else {
            alert(`${quantity}자리만 선택해주세요`);
        }
    }
    
    return (
        <></>
    )
}