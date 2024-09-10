import Image from 'next/image';
import styles from '../../styles/home/main.module.css';
import slogan from '../../../public/images/slogan.svg';
import maintext from '../../../public/images/maintext.svg';
import start from '../../../public/images/start.svg';

interface SetFunc {
    setView: (arg:boolean)=>void; 
}

export default function Main({setView}:SetFunc) {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.sloganWrapper}>
                <Image src={slogan} alt='slogan'/>
            </div>
            <div className={styles.textWrapper}>
                <Image src={maintext} alt='maintext'/>
            </div>
            <div onClick={()=>setView(true)} className={styles.start}>
                <Image src={start} alt='startBtn'/>
            </div>
        </div>
    )
}