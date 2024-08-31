"use client";
import styles from '@/styles/reservation/reservation.module.css';
import { useRouter, useSearchParams } from "next/navigation";
import { useRef} from "react";
import cookie from 'js-cookie';
import FormList from '@/components/reservation/FormList';
import NextBtn from '@/components/Buttons/NextBtn';

export default function Reservtion(props:any) {
    const param = useSearchParams();
    const quantity:number = parseInt(param.get("quantity")||"0");
    const id = param.get("id");
    const router = useRouter();
    const firstnameRefs = useRef<(HTMLInputElement|null)[]>([]); // ref 배열로 사용
    const lastnameRefs = useRef<(HTMLInputElement|null)[]>([]);
    const birthRefs = useRef<(HTMLInputElement|null)[]>([]);
    const nationRefs = useRef<(HTMLInputElement|null)[]>([]);
    const genderRefs = useRef<(HTMLSelectElement|null)[]>([]);
    const email1Refs = useRef<(HTMLInputElement|null)[]>([]);
    const email2Refs = useRef<(HTMLInputElement|null)[]>([]);

    function handleSubmit(e:React.FormEvent) {
        e.preventDefault();

        for(let j=0;j<quantity;j++){
          const firstName = firstnameRefs.current[j]?.value||"";
          const lastName = lastnameRefs.current[j]?.value||"";
          const birthDate = birthRefs.current[j]?.value||"";
          const nationality = nationRefs.current[j]?.value||"";
          const gender = genderRefs.current[j]?.value||"";
          const email1 = email1Refs.current[j]?.value||"";
          const email2 = email2Refs.current[j]?.value||"";

          const nameRegex = /^[a-zA-Z]+$/;
          const emailRegex = /^[a-zA-Z0-9]+$/;
          const emailDomainRegex = /^[a-zA-Z]+\.com$/;
          const birthRegex = /^\d{8}$/;

          if (!nameRegex.test(firstName)) {
              alert(`예약자 ${j + 1}: 유효한 First Name을 입력하세요.`);
              return;
          }

          if (!nameRegex.test(lastName)) {
              alert(`예약자 ${j + 1}: 유효한 Last Name을 입력하세요.`);
              return;
          }

          if (!birthRegex.test(birthDate)) {
              alert(`예약자 ${j + 1}: 생년월일을 8자리 숫자로 입력하세요 (예: 19900101).`);
              return;
          }

          if (!emailRegex.test(email1)) {
              alert(`예약자 ${j + 1}: 유효한 이메일 아이디를 입력하세요.`);
              return;
          }

          if (!emailDomainRegex.test(email2)) {
              alert(`예약자 ${j + 1}: 유효한 이메일 도메인을 입력하세요.`);
              return;
          }

          if (!gender) {
            alert("성별을 선택하세요.");
            return;
          }

          cookie.set('firstName'+j,firstName);
          cookie.set('lastName'+j,lastName);
          cookie.set('birth'+j,birthDate);
          cookie.set('nationality'+j,nationality);
          cookie.set('gender'+j,gender);
          cookie.set('email'+j,email1+"@"+email2);

          router.push(`/reservation/seat?id=${id}&quantity=${quantity}`);
        }
    } 
    
    return (
      <div className={styles.pageWrapper}>
        <FormList firstnameRefs={firstnameRefs} lastnameRefs={lastnameRefs} birthRefs={birthRefs} nationRefs={nationRefs} genderRefs={genderRefs} email1Refs={email1Refs} email2Refs={email2Refs}/>
        <NextBtn handleSubmit={handleSubmit}/>
      </div>
    )
}