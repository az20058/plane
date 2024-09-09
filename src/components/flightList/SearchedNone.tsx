import styles from '@/styles/flightList/flightList.module.css';
import searchIcon from '@/../public/images/searchIcon.svg';
import Image from 'next/image';

export default function SearchedNone() {
    return (
        <div className={styles.notSearched}>
            <div className={styles.textWrapper}>
                <span>해당 조건의 </span>
                <span>&nbsp;검색 결과가 없습니다</span>
                <span>, 다시 검색해 주세요</span>
                <Image src={searchIcon} alt="searchIcon"/>
            </div>
        </div>
    )
}