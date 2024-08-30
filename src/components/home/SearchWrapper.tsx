"use client";
import planeIcon2 from '../../../public/images/planeIcon2.svg';
import { useStore } from '@/store/store';
import styles from '@/styles/home/searchFlight.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import SearchBtn from '../Buttons/SearchBtn';

export default function SearchWrapper() {
    const {setsQuantity} = useStore();
    const router = useRouter();
    const arrCityRef = useRef<HTMLSelectElement>(null); //도착 도시 이름
    const depCityRef = useRef<HTMLSelectElement>(null); //출발 도시 이름
    const dateRef = useRef<HTMLInputElement>(null);
    const [quantity, setQuantity] = useState<number>(1); //승객 수
    const today = new Date().toISOString().slice(0,10);

    function searchCity() {
      if(depCityRef.current&&arrCityRef.current&&dateRef.current) {
        setsQuantity(quantity);
        router.push(`/flightList?depCity=${depCityRef.current.value.trim()}&arrCity=${arrCityRef.current.value.trim()}&date=${dateRef.current.value.replace(/-/g, "")}&korDep=${depCityRef.current.options[depCityRef.current.selectedIndex].text}&korArr=${arrCityRef.current.options[arrCityRef.current.selectedIndex].text}&quantity=${quantity}`);
      }
    }

    function plusQuantity() {
        if(quantity===9)
            return;
        setQuantity(quantity+1);
    }

    function minusQuantity() {
        if(quantity===1)
            return;
        setQuantity(quantity-1);
    }
    
    return (
        <div className={styles.searchWrapper}>
            <div className={styles.cityWrapper}>
                <div>
                    <select className={styles.selectCity} ref={depCityRef}>
                        <option value="NAARKSS">서울</option>
                        <option value="NAARKPC">제주</option>
                        <option value="NAARKPK">부산</option>
                        <option value="NAARKJJ">광주</option>
                    </select>
                </div>
                {/* <input type="text" ref={depCityRef} id="searchCity" placeholder="출발지를 입력하세요"/> */}
                <Image src={planeIcon2} alt='planeIcon2' className={styles.planeIcon}/>
                <div>
                    <select className={styles.selectCity} ref={arrCityRef}>
                        <option value="NAARKPC">제주</option>
                        <option value="NAARKSS">서울</option>
                        <option value="NAARKPK">부산</option>
                        <option value="NAARKJJ">광주</option>
                    </select>
                </div>
            </div>
            {/* <input type="text" ref={arrCityRef} id="searchCity" placeholder="도착지를 입력하세요"/> */}
            <div>
                <input type="date" className={styles.selectCity} max="2077-06-20" min={today} ref={dateRef} defaultValue={today}/>
            </div>
            <div className={styles.selectQuantity}>
                <div>
                    <button onClick={minusQuantity}>-</button>
                </div>
                <div>
                    <span className={styles.selectCity}>{quantity}명</span>
                </div>
                <div>
                    <button onClick={plusQuantity}>+</button>
                </div>
            </div>
            <SearchBtn onClick={searchCity}/>
        </div>
    )
}