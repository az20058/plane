import Header from '@/components/Headers/Header';
import styles from '../../styles/flightList/flightList.module.css';
import List from '@/components/flightList/List';
import { Suspense } from 'react';
import Loading from './loading';

export default function FlightList(props:any) {
    const param = props.searchParams;

    return (
        //param.korDep, param.korArr 를 pay 컴포넌트의 props로 넣어줘야 됨.
        <div className={styles.pageWrapper}>
            <Header msg1='#티켓서치' msg2='항공편 조회하기' msg3='사용자가 계획한 상세 일정에 맞는 비행기를 확인해 보세요'/>
            <Suspense fallback={<Loading/>}>
                <List param={param}/>
            </Suspense>
        </div>

    )
}