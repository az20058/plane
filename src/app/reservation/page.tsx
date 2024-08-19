"use client";
import { useStore } from "../store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import cookie from 'js-cookie';

interface FormData {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    email1: string;
    email2: string;
    nationality: string;
}


export default function Reservtion(props:any) {
    const {quantity} = useStore();
    const router = useRouter();
    const param = useSearchParams();
    const [formDataArray, setFormDataArray] = useState<FormData[]>([]);

    useEffect(()=>{
        const initialFormDataArray = [];
        for (let i = 0; i < quantity; i++) {
          initialFormDataArray.push({
            firstName: "",
            lastName: "",
            birthDate: "",
            gender: "",
            email1: "",
            email2: "",
            nationality: "",
          });
        }
        setFormDataArray(initialFormDataArray);
      },[quantity])

    function handleSubmit(e:React.FormEvent) {
        e.preventDefault();

        for(let j=0;j<quantity;j++){
            cookie.set('firstName'+j, formDataArray[j].firstName);
            cookie.set('lastName'+j, formDataArray[j].lastName);
            cookie.set('birth'+j, formDataArray[j].birthDate);
            cookie.set('nationality'+j, formDataArray[j].nationality);
            cookie.set('gender'+j, formDataArray[j].gender);
            cookie.set('email'+j, formDataArray[j].email1+"@"+formDataArray[j].email2);
            //console.log(formData);
            router.push(`/reservation/${props.params.id}/seat`);
        }
    } 
    
    return (
        <></>
    )
}