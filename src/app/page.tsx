"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {Button} from "react-bootstrap"
import { useStore } from "./store";

export default function Home() {
    const {setsQuantity} = useStore();
    const router = useRouter();
    const arrCityRef = useRef<HTMLSelectElement>(null); //도착 도시 이름
    const depCityRef = useRef<HTMLSelectElement>(null); //출발 도시 이름
    const dateRef = useRef<HTMLInputElement>(null);
    let view:string = "829,091,839,019";
    let nowView:string = "17189";
    const [quantity, setQuantity] = useState<number>(1); //승객 수
    const today = new Date().toISOString().slice(0,10);

    function searchCity() {
      if(depCityRef.current&&arrCityRef.current&&dateRef.current) {
        setsQuantity(quantity);
        router.push(`/flightList?depCity=${depCityRef.current.value.trim()}&arrCity=${arrCityRef.current.value.trim()}&date=${dateRef.current.value.replace(/-/g, "")}`);
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
    <>
      <div className="home">
            <div className="search sm:w-[45vw] w-[100vw]">
                <div className="logo"></div>
                <div className="searchWrapper sm:w-full">
                    <div>
                        <select ref={depCityRef}>
                            <option value="NAARKSS">서울</option>
                            <option value="NAARKPC">제주</option>
                            <option value="NAARKPK">부산</option>
                            <option value="NAARKJJ">광주</option>
                        </select>
                    </div>
                    {/* <input type="text" ref={depCityRef} id="searchCity" placeholder="출발지를 입력하세요"/> */}
                    
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWtdvm-RKOtIG1uq5_Ix9abcbvrRRaQFVn-rXFjnnXg&s" id="planeIcon"/>
                    
                    <div>
                        <select ref={arrCityRef}>
                            <option value="NAARKPC">제주</option>
                            <option value="NAARKSS">서울</option>
                            <option value="NAARKPK">부산</option>
                            <option value="NAARKJJ">광주</option>
                        </select>
                    </div>
                    {/* <input type="text" ref={arrCityRef} id="searchCity" placeholder="도착지를 입력하세요"/> */}
                    <div>
                        <input type="date" id="searchDate" max="2077-06-20" min={today} ref={dateRef} defaultValue={today}/>
                    </div>
                    <div>
                        <Button onClick={minusQuantity}>-</Button>
                    </div>
                    <div>
                        <span>{quantity}명</span>
                    </div>
                    <div>
                        <Button onClick={plusQuantity}>+</Button>
                    </div>
                    <div>
                        <button className="main_search" onClick={searchCity}>검색</button>{' '}
                    </div>
                </div>
                <div className="use">
                    <div className="inline">
                        <span>Total use  : </span>
                        <div className="accumulate">
                            <span className="acc_view">{view}</span>
                        </div>
                    </div>
                    <div className="inline">
                        <span>Today use : </span>
                        <div className="today">
                            <span className="acc_view">{nowView}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
