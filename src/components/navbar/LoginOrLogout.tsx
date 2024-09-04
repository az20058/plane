"use client";
import Link from "next/link";
import { getLogin } from "@/hooks/getLogin";
import cookie from 'js-cookie';
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function LoginOrLogout() {
    const [username, setUsername] = useState<string|undefined>('');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(()=>{
        setUsername(getLogin());
    }, [pathname])

    function handleLogout() {
        cookie.remove("username");
        if(pathname==="/")
            window.location.reload();
        else
            router.push("/");
    }
    
    return (
        username?<button onClick={handleLogout}>로그아웃</button>:<Link href='/login'>로그인</Link>
    )
}