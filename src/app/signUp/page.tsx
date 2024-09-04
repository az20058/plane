"use client";
import SignUpInput from '@/components/signUp/SignUpInput';
import styles from '@/styles/login/signUp.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function SignUp() {
    const router = useRouter();
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const birthRef = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/find/login/${idRef.current?.value}`)
            .then((res)=>{
                if(res.data){
                    alert("이미 존재하는 아이디입니다.");
                    window.location.reload();
                }
            })

        axios.post((`${process.env.NEXT_PUBLIC_SERVER_URL}/user`), {
            username: idRef.current?.value,
            password: pwRef.current?.value,
            email: emailRef.current?.value,
            phone: phoneRef.current?.value,
            birth: birthRef.current?.value, 
        })
            .then(()=>{
                alert("회원가입이 완료되었습니다.");
                router.push('/login');
            })
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <span>회원가입을 진행해 주세요</span>
                </div>
                <SignUpInput idRef={idRef} pwRef={pwRef} emailRef={emailRef} phoneRef={phoneRef} birthRef={birthRef}/>
                <div className={styles.btnWrapper}>
                    <button onClick={handleSubmit}>계속 진행하기</button>
                </div>
            </div>
        </div>
    )
}