"use client";
import styles from '@/styles/home/checkRes.module.css';
import { useState } from 'react';
import SearchBtn from '../Buttons/SearchBtn';

export default function CheckResInput() {
    const [selectedEmail, setSelectedEmail] = useState<boolean>(true);

    return (
        <div className={styles.checkRes}>
            <div className={styles.btnWrapper}>
                <div>
                    <button className={selectedEmail?styles.active:""} onClick={()=>setSelectedEmail(true)}>이메일로 찾기</button>
                </div>    
                <div>
                    <button className={selectedEmail?"":styles.active} onClick={()=>setSelectedEmail(false)}>예약번호로 찾기</button>
                </div>
            </div>
            <div className={styles.findRes}>
                {selectedEmail?
                <div className={styles.inputWrapper}>
                    <input placeholder='이메일을 입력하세요'/>
                    <span>@</span>
                    <input placeholder='직접입력 또는 선택'/>
                    <SearchBtn/>
                </div>:(
                <div className={styles.inputWrapper}>
                    <input placeholder='예약번호를 입력하세요'/>
                    <SearchBtn/>
                </div>
                )}
            </div>
        </div>
    )
}