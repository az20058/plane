import styles from '@/styles/checkRes/checkRes.module.css';
import ResList from '../../components/checkRes/ResList';
import Header from '@/components/Headers/Header';
import { Suspense } from 'react';
import Loading from '../flightList/loading';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function CheckRes() {
    const cookie = cookies();
    const username = cookie.get("username")?.value;
    if (!username || username === "null") {
        redirect('/login');
    }

    return (
        <div className={styles.pageWrapper}>
            <Header msg1='#바잉티켓' msg2='구매 내역 확인' msg3='구매 정보 중 항공편명과 시간을 유의해 확인하시길 바랍니다'/>
            <Suspense fallback={<Loading/>}>
                <ResList/>
            </Suspense>
        </div>
    )
}