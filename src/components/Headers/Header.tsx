import Image from 'next/image';
import styles from '../../styles/home/checkRes.module.css';

interface props {
    msg1: string,
    msg2: string,
    msg3: string
}

export default function Header({msg1, msg2, msg3}:props) {
    return (
        <div className={styles.headerWrapper}>
            <label>{msg1}</label>
            <h2>{msg2}</h2>
            <span>{msg3}</span>
        </div>
    )
}