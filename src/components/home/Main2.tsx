import Image from 'next/image';
import styles from '../../styles/home/main2.module.css';
import plane from '../../../public/images/plane.svg';
import start from '../../../public/images/start.svg';

export default function Main2() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.imgPlane}>
                <Image src={plane} alt='plane'/>
            </div>
        </div>
    )
}