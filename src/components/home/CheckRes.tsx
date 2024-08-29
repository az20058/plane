import Image from 'next/image';
import styles from '../../styles/home/checkRes.module.css';
import planeIcon2 from '../../../public/images/planeIcon2.svg';
import SearchBtn from '../Buttons/SearchBtn';
import CheckResInput from './CheckResInput';
import Header from '../Headers/Header';

export default function CheckRes() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.checkResWrapper}>
                <div className={styles.header}>
                    <Header msg1='#체크필수' msg2='예약 내역 확인' msg3='로그인을 진행 후 메인화면에서 내역을 확인해 주세요'/>
                    <div className={styles.line}/>
                    <div className={styles.imgWrapper}>
                        <Image src={planeIcon2} alt='planeIcon2'/>
                    </div>
                    <div className={styles.spanWrapper}>
                        <span>이메일 혹은 예약번호</span>
                        <span>를 입력해 간단히 내역을 확인해봐요</span>
                    </div>
                </div>
                <CheckResInput/>
            </div>
        </div>
    )
}