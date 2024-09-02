"use client";
import styles from '@/styles/reservation/seat.module.css';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import axios from "axios";

interface SeatDto {
    num: number,
    buyTime: string,
    resKey: string,
    seatCode: string,
    email: string,
    username: string,
    isRes: string,
    tmpRes: string
}

export default function Seat(props:any) {
    const [data, setData] = useState<SeatDto[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [selectedSeatsId, setSelectedSeatsId] = useState<number[]>([]);
    const router = useRouter();
    const param = useSearchParams();
    const id = param.get("id");
    const quantity = parseInt(param.get("quantity")||"0");
    const type = param.get("type");
    const [seats, setSeats] = useState<string[]>([]);
    const [count, setCount] = useState<number>(quantity);

    useEffect(() => {
        const seatParams = param.get("seats");
        if (seatParams) {
            setSeats(seatParams.split(','));
        } 
        const seatFetch = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/seat/${id}`);
                setData(res.data);
            } catch (error) {
                console.error("Error fetching seat data:", error);
            }
        };

        seatFetch();
    }, []);

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

    async function handleSubmit() {
        if (count !== 0) {
            alert("좌석을 전부 선택해주세요");
            return;
        }

        for (let seatId of selectedSeatsId) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/find/${seatId}`);
            if (res.data === 1) {
                alert("이미 예약중인 좌석입니다.");
                window.location.reload();
                return;
            }
        }

        for (let seatId of selectedSeatsId) {
            await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/seat/tmpReservation/${seatId}`, {
                tmpRes: "true"
                //findByTmpRes로 true
            });
            await axios.get(`${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/tmpRes/${seatId}`);
        }

        const query = "?" + queryString.stringify({ selectedSeatsId });
        router.push('./seat/finalRes' + query);
    }

    function renderSeat() {
        const seatRows = [];
        const seatsPerLabel = 8;
        
        for(let i=0;i<11;i++){
            const tmpRows = (
                <div key={i} className={styles.seats}>
                    {data.slice(i*seatsPerLabel, i*seatsPerLabel+seatsPerLabel).map((item, index)=>{
                        return(
                            <button key={index} className={styles.seat}>{item.seatCode}</button>
                        )
                    })}
                </div>
            )
            seatRows.push(tmpRows);
        }
        return seatRows;
    }
    
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.resSeat}>
                <div className={styles.seatWrapper}>
                    <div className={styles.front}>
                        <div className={styles.seatPageWrapper}>
                            {renderSeat()}
                        </div>
                    </div>
                    <div className={styles.back}/>
                </div>
                <div className={styles.seatList}>

                </div>
                <div className={styles.btnWrapper}>

                </div>
            </div>
        </div>
    )
}