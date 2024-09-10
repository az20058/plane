import styles from '@/styles/home/searchFlight.module.css';
import planeIcon from '../../../public/images/planeIcon.svg';
import Image from 'next/image';
import View from './View';
import SearchWrapper from './SearchWrapper';
import { MutableRefObject } from 'react';

interface RefProp {
  scrollRef: MutableRefObject<HTMLDivElement|null>;
}

export default function SearchFlight({scrollRef}:RefProp) {
  
  return (
    <div ref={scrollRef} className={styles.pageWrapper}>
        <div className={styles.header}>
            <Image src={planeIcon} alt='planeIcon'/>
            <h2>항공편 조회하기</h2>
            <span>사용자가 계획한 상세 일정에 맞는 비행기를 확인해 보세요</span>
        </div>
        <View/>
        <SearchWrapper/>
    </div>
  );
}