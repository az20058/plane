"use client";
import styles from '@/styles/home/checkRes.module.css';
import { useRef, useState } from 'react';
import SearchBtn from '../Buttons/SearchBtn';
import planeIcon2 from '@/../public/images/planeIcon2.svg';
import Image from 'next/image';
import axios from 'axios';
import AirLine from '../flightList/AirLine';
import NextBtn from '../Buttons/NextBtn';
import { useRouter } from 'next/navigation';
import ResCardColor from './ResCardColor';

interface CardProps {
    date: string,
    airLine: string,
    customer: number,
    depCity: string,
    arrCity: string,
    flightCode: string
}

export default function CheckResInput() {
    const [selectedEmail, setSelectedEmail] = useState<boolean>(true);
    const emailRef = useRef<HTMLInputElement>(null);
    const emailRef2 = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    const [isSearched, setIsSearched] = useState(false);
    const [cardData, setCardData] = useState<CardProps[]>([]);
    const router = useRouter();

    function handleFind() {
        if(selectedEmail){
            const email = emailRef.current?.value +"@"+ emailRef2.current?.value;
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/find/email/${email}`)
                .then(res=>{
                    setCardData(res.data);
                })
        }
        else {
            const resCode = codeRef.current?.value;
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/find/code/${resCode}`)
                .then(res=>{
                    setCardData(res.data);
                })
        }
        setIsSearched(true);
    }

    return (
    <>
        {isSearched?
        <div className={styles.checkRes}>
            <div style={selectedEmail?{}:{overflowX:"hidden", display:"flex", justifyContent:"center"}} className={styles.resCardWrapper}>
            {
                cardData.map((item, index)=>(
                    <div key={index} className={styles.resCard}>
                        <div className={styles.contentWrapper}>
                            <AirLine flightCode='' airlineNm={item.airLine} height={116} width={450}/>
                            <div className={styles.dateAirLine}>
                                <span>{item.date.slice(0,4)}년 {item.date.slice(4,6)}월 {item.date.slice(6)}일 | </span>
                                <span>{item.airLine} | </span>
                                <span>{item.customer} 명</span>
                            </div>
                            <div className={styles.arrCity}>
                                <span>{item.depCity}  ➡  {item.arrCity}</span>
                            </div>
                            <ResCardColor flightCode={item.flightCode} airLineNm={item.airLine}/>
                        </div>
                    </div>
                ))
            }
            </div>
            <NextBtn msg='구매내역 바로가기' handleSubmit={()=>router.push('/checkRes')}/>
        </div>
        :
        <div className={styles.checkRes}>
            <div className={styles.line}/>
            <div className={styles.imgWrapper}>
                <Image src={planeIcon2} alt='planeIcon2'/>
            </div>
            <div className={styles.spanWrapper}>
                <span>이메일 혹은 예약번호</span>
                <span>를 입력해 간단히 내역을 확인해봐요</span>
            </div>
            <div className={styles.btnWrapper}>
                <div>
                    <button className={selectedEmail?styles.active:""} onClick={()=>{setSelectedEmail(true); if(codeRef.current) codeRef.current.value=""}}>이메일로 찾기</button>
                </div>    
                <div>
                    <button className={selectedEmail?"":styles.active} onClick={()=>{setSelectedEmail(false); if(emailRef.current) emailRef.current.value=""}}>예약번호로 찾기</button>
                </div>
            </div>
            <div className={styles.findRes}>
                {selectedEmail?
                <div className={styles.inputWrapper}>
                    <input ref={emailRef} placeholder='이메일을 입력하세요'/>
                    <span>@</span>
                    <input ref={emailRef2} placeholder='naver.com'/>
                    <SearchBtn onClick={handleFind}/>
                </div>:(
                <div className={styles.inputWrapper}>
                    <input ref={codeRef} placeholder='예약번호를 입력하세요'/>
                    <SearchBtn onClick={handleFind}/>
                </div>
                )}
            </div>
        </div>}
    </>
    )
}