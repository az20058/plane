import styles from '../../styles/navbar.module.css';
import Image from 'next/image';
import navLogo from '../../../public/images/navLogo.svg';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.menuWrapper}>
                <div className={styles.logo}>
                    <Link href="/"><Image src={navLogo} alt='Logo in Navbar'/></Link>
                </div>
                <div className={styles.menuItem}>
                    <button>로그인</button>
                </div>
                <div className={styles.menuItem}>
                    <button>회원가입</button>
                </div>
                <div className={styles.menuItem}>
                    <button>구매 내역</button>
                </div>
            </div>
            <div className={styles.user}>
                <span className={styles.username}>김예찬 님 </span>
                <span>로그인</span>
            </div>
        </div>
    )
}