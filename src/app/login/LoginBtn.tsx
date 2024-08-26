"use client";

import axios from "axios";
import cookie from 'js-cookie';
import { useRouter } from "next/navigation";

interface UserProps {
    username: string,
    password: string
}

export default function LoginBtn({username, password}:UserProps) {
    const router = useRouter();
    
    function processLogin(){
        axios.post((`${process.env.NEXT_SERVER_URL}/login`),null,{
          params: {
            username,
            password,
          }
        })
        .then(res=>{
          axios.get(`${process.env.NEXT_SERVER_URL}/userDto`, {
            headers: {
              Authorization: res.headers['Authorization']
            }
          })
            .then(res=>{
              cookie.set("isLogin", "true");
              cookie.set("username", res.data.split(' ')[0]);
            })
            .catch(err=>{
              console.error("userDto error", err);
            })
          router.push(`/`);
        })
        .catch(err=>{
          console.error("login error", err);
          alert("아이디 또는 비밀번호가 일치하지 않습니다.");
          // window.location.reload();
        })
      }
    
    return (
        <></>
    )
}