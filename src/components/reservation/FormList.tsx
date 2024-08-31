"use client";
import styles from '@/styles/reservation/reservation.module.css';
import { useSearchParams } from "next/navigation";
import { MutableRefObject, useEffect, useState } from "react";

interface FormProps {
    firstnameRefs: MutableRefObject<(HTMLInputElement|null)[]>,
    lastnameRefs: MutableRefObject<(HTMLInputElement|null)[]>,
    birthRefs: MutableRefObject<(HTMLInputElement|null)[]>,
    nationRefs: MutableRefObject<(HTMLInputElement|null)[]>,
    genderRefs: MutableRefObject<(HTMLSelectElement|null)[]>,
    email1Refs: MutableRefObject<(HTMLInputElement|null)[]>,
    email2Refs: MutableRefObject<(HTMLInputElement|null)[]>
}

export default function FormList(props:FormProps) {
    const param = useSearchParams();
    const quantity:number = parseInt(param.get("quantity")||"0");
    const id = param.get("id");
    const [list, setList] = useState<number[]>([]);
    
    useEffect(()=>{
        const initialList:number[] = [];
  
        for(let i=0;i<quantity;i++) {
          initialList.push(i);
        }
  
        setList(initialList);
      }, [])
    
    return (
        <>{
            list.map((item, index)=>(
              <div key={index} className={styles.formWrapper}>
                <div className={styles.header}>
                  <label>예약자 {index+1}</label>
                </div>
                <div className={styles.userForm}>
                  <div className={styles.name}>
                    <div>
                      <label>FIRST NAME</label>
                      <input ref={el=>{props.firstnameRefs.current[index]=el;}} placeholder='이름(영문)'/>
                    </div>
                    <div>
                      <label>LAST NAME</label>
                      <input ref={el=>{props.lastnameRefs.current[index]=el;}} placeholder='성(영문)'/>
                    </div>
                  </div>
                  <div className={styles.email}>
                    <label>이메일</label>
                    <div>
                      <input ref={el=>{props.email1Refs.current[index]=el;}} placeholder='이메일 입력'/>
                      <span>@</span>
                      <input ref={el=>{props.email2Refs.current[index]=el;}} placeholder='naver.com'/>
                    </div>
                  </div>
                  <div className={styles.others}>
                    <div>
                      <label>생년월일</label>
                      <input ref={el=>{props.birthRefs.current[index]=el;}} placeholder='EX) 19900101'/>
                    </div>
                    <div>
                      <label>성별</label>
                      <div className={styles.selectWrapper}>
                        <select ref={el=>{props.genderRefs.current[index]=el;}}>
                          <option value="" selected>선택 안함</option>
                          <option value="man">남자</option>
                          <option value="woman">여자</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label>국적</label>
                      <input ref={el=>{props.nationRefs.current[index]=el;}} placeholder='국적을 입력해 주세요'/>
                    </div>
                  </div>
                </div>
                <div style={list.length>1&&index+1!==list.length?{}:{display:"none"}} className={styles.line}/>
              </div>
            ))
          }
        </>
    )
}