"use client";
import styles from '@/styles/navbar.module.css';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { getLogin } from '@/hooks/getLogin';
import { usePathname } from 'next/navigation';

export default function UserInfo() {
    const [username, setUsername] = useState<string|undefined>('');
    const pathname = usePathname();

    useEffect(()=>{
        setUsername(getLogin());
    }, [pathname])
    
    return (
        username?
        <div className={styles.user}>
            <span className={styles.username}>{username} 님 </span>
            <span>로그인</span>
        </div>
        :
        <></>
    )
}