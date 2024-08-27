import Image from 'next/image';
import styles from '../../styles/home/main.module.css';
import slogan from '../../../public/images/slogan.svg';
import maintext from '../../../public/images/maintext.svg';

export default function Main() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.sloganWrapper}>
                <Image src={slogan} alt='slogan'/>
            </div>
            <div className={styles.textWrapper}>
                <Image src={maintext} alt='maintext'/>
            </div>
        </div>
    )
}