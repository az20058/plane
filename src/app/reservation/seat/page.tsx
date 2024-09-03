"use client";
import styles from '@/styles/reservation/seat.module.css';
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import axios from "axios";
import ResSeat from '@/components/reservation/ResSeat';
import ResList from '@/components/reservation/ResList';
import NextBtn from '@/components/Buttons/NextBtn';
// interface SeatDto {
//     num: number,
//     buyTime: string,
//     resKey: string,
//     seatCode: string,
//     email: string,
//     username: string,
//     isRes: string,
//     tmpRes: string
// }

interface seat {
    seatCode: string,
    seatNum: number
}

export default function Seat(props:any) {
    const [selectedSeatsId, setSelectedSeatsId] = useState<seat[]>([]);
    const router = useRouter();
    const param = useSearchParams();
    const quantity = parseInt(param.get("quantity")||"0");
    // const type = param.get("type");
    // const [seats, setSeats] = useState<string[]>([]);
    const [count, setCount] = useState<number>(quantity);
    const lastSelectedSeatRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        // 마지막 선택된 좌석으로 스크롤
        if (lastSelectedSeatRef.current) {
            lastSelectedSeatRef.current.scrollIntoView({ behavior: 'smooth', inline: 'end' });
        }
    }, [selectedSeatsId]);

    function handleReservation(seatNum: number, seatCode: string) {
        if (selectedSeatsId.some(seat=>seat.seatNum===seatNum)) {
            const newSelectedSeatsId = selectedSeatsId.filter(seat => seat.seatNum !== seatNum);
            setSelectedSeatsId(newSelectedSeatsId);
            setCount(prevCount => prevCount + 1);
        } else if (count > 0) {
            setSelectedSeatsId([...selectedSeatsId, { seatNum, seatCode }]);
            setCount(prevCount => prevCount - 1);
        } else {
            alert(`${quantity}자리만 선택해주세요`);
        }
    }

    async function handleSubmit() {
        if (count !== 0) {
            alert("좌석을 전부 선택해주세요");
            return;
        }

        for (let seat of selectedSeatsId) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/find/${seat.seatNum}`);
            if (res.data === 1) {
                alert("이미 예약중인 좌석입니다.");
                window.location.reload();
                return;
            }
        }

        for (let seat of selectedSeatsId) {
            await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/seat/tmpReservation/${seat.seatNum}`, {
                tmpRes: "true"
                //findByTmpRes로 true
            });
            await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/tmpRes/${seat.seatNum}`);
        }

        const query = "?" + queryString.stringify({ selectedSeatsId });
        router.push('./seat/finalRes' + query);
    }
    
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.resSeatPage}>
                <ResSeat selectedSeatsId={selectedSeatsId} handleReservation={handleReservation}/>
                <ResList selectedSeatsId={selectedSeatsId} handleReservation={handleReservation} lastSelectedSeatRef={lastSelectedSeatRef}/>
                <NextBtn handleSubmit={handleSubmit} msg="좌석 예매하기"/>
            </div>
        </div>
    )
}