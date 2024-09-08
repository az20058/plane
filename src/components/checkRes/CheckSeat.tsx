"use client";
import styles from '@/styles/checkRes/checkRes.module.css';
import { useRouter } from 'next/navigation';

interface ResProps {
    flightId: number,
    seatNum: number[],
    seatCode: string[]
}

export default function CheckSeat({flightId, seatNum, seatCode}: ResProps) {
    const router = useRouter();

    async function handleCheckSeat(){
        router.push(`/reservation/seat?type=1&seats=${seatNum}&seatCode=${seatCode}&id=${flightId}`);
    }
    
    return (
        <button onClick={handleCheckSeat} className={styles.checkResBtn}>좌석 확인</button>
    )
}