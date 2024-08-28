import Image from 'next/image';
import styles from '../../styles/home/checkRes.module.css';
import planeIcon2 from '../../../public/images/planeIcon2.svg';

export default function CheckRes() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.checkResWrapper}>
                <div className={styles.header}>
                    <label>#체크필수</label>
                    <h2>예약 내역 확인</h2>
                    <span>로그인을 진행 후 메인화면에서 내역을 확인해 주세요</span>
                    <div className={styles.line}/>
                    <div className={styles.imgWrapper}>
                        <Image src={planeIcon2} alt='planeIcon2'/>
                    </div>
                    <div className={styles.spanWrapper}>
                        <span>이메일 혹은 예약번호</span>
                        <span>를 입력해 간단히 내역을 확인해봐요</span>
                    </div>
                </div>
                <div className={styles.checkRes}>
                    <div className={styles.btnWrapper}>
                        <button>이메일로 찾기</button>
                        <button>예약번호로 찾기</button>
                    </div>
                    <div className={styles.findRes}>
                        <div className={styles.inputWrapper}>
                            <input placeholder='이메일을 입력하세요'/>
                            <span>@</span>
                            <input placeholder='직접입력 또는 선택'/>
                            <button>검색</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}