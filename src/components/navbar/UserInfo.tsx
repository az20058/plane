"use client";
import styles from '@/styles/navbar.module.css';
import { useEffect, useState } from 'react';
import { usegetLogin } from '@/hooks/getLogin';
import { usePathname } from 'next/navigation';

export default function UserInfo() {
    const [username, setUsername] = useState<string|undefined>('');
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setUsername(usegetLogin());
    }, [pathname])

    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        mounted&&username?
        <div className={styles.user}>
            <span className={styles.username}>{username} 님 </span>
            <span>로그인</span>
        </div>
        :
        <></>
    )
}