import styles from '@/styles/reservation/seat.module.css';
import { MutableRefObject } from 'react';

interface SeatProps {
    selectedSeatsId: any[],
    handleReservation: (seatNum: number, seatCode: string) => void;
    lastSelectedSeatRef: MutableRefObject<HTMLDivElement|null>
}

export default function ResList({selectedSeatsId, handleReservation, lastSelectedSeatRef}:SeatProps) {
    return (
        <div className={styles.resList}>
            <div className={styles.resSeatsContainer}>
                <div className={styles.labelWrapper}>
                    <label>선택 좌석 |</label>
                </div>
                <div className={styles.resSeats}>
                    {selectedSeatsId.map((seat, index)=>(
                        <div
                            key={seat.seatCode} 
                            className={styles.resSeat}
                            ref={index === selectedSeatsId.length - 1 && selectedSeatsId.length > 5 ? lastSelectedSeatRef : null}
                        >
                            <div>
                                <label>{seat.seatCode}</label>
                            </div>
                            <div>
                                <button onClick={()=>handleReservation(seat.seatNum, seat.seatCode)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}