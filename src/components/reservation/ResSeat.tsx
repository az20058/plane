import styles from '@/styles/reservation/seat.module.css';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

interface SeatProps {
    selectedSeatsId: any[],
    handleReservation: (seatNum: number, seatCode: string) => void;
}

export default function ResSeat({selectedSeatsId, handleReservation}:SeatProps) {
    const [data, setData] = useState<SeatDto[]>([]);
    const param = useSearchParams();
    const quantity = parseInt(param.get("quantity")||"0");
    const id = param.get("id");
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
    
    function isSeatSelected(seatNum:number):boolean {
        return selectedSeatsId.some(seat=>seat.seatNum===seatNum);
    }
    
    function renderSeat() {
        const seatRows = [];
        const seatsPerLabel = 8;
        
        for(let i=0;i<11;i++){
            const tmpRows = (
                <div key={i} className={styles.seats}>
                    {data.slice(i*seatsPerLabel, i*seatsPerLabel+seatsPerLabel).map((seat)=>{
                        const isSelected = isSeatSelected(seat.num) || seats.includes(seat.num.toString());
                        const isReserved = seat.isRes === "true" || seat.tmpRes === "true";
                        return(
                            <button 
                                key={seat.num} className={`${styles.seat} ${isSelected?styles.selected:""} ${isReserved?styles.reserved:""}`}
                                onClick={()=>handleReservation(seat.num, seat.seatCode)}
                                disabled={isReserved || type === "1"}
                            >{seat.seatCode}</button>
                        )
                    })}
                </div>
            )
            seatRows.push(tmpRows);
        }
        return seatRows;
    }
    
    return (
        <div className={styles.seatWrapper}>
            <div className={styles.front}>
                <div className={styles.seatPageWrapper}>
                    {renderSeat()}
                </div>
            </div>
            <div className={styles.back}/>
        </div>
    )
}