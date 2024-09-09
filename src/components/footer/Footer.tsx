import Image from 'next/image';
import styles from '../../styles/footer.module.css';
import vector from '../../../public/images/vector.svg';
import footerLogo from '../../../public/images/footerLogo.svg';
import Link from 'next/link';
import LoginOrLogout from '../navbar/LoginOrLogout';

export default function Footer() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.contentWrapper}>
                <div className={styles.logoWrapper}>
                    <Image src={footerLogo} alt='footerLogo'/>
                </div>
                <div className={styles.menu}>
                    <span>내역</span>
                    <Link href='/checkRes'>구매 내역</Link>
                    <button>탑승객 정보</button>
                </div>
                <div className={styles.menu}>
                    <span>정보</span>
                    <LoginOrLogout/>
                    <Link href='/signUp'>회원가입</Link>
                </div>
                <div className={styles.vector}>
                    <Image src={vector} alt='vector'/>
                </div>
            </div>
        </div>
    )
}