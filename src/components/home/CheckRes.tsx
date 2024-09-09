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
                </div>
                <CheckResInput/>
            </div>
        </div>
    )
}