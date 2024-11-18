"use client";
import Link from "next/link";
import { usegetLogin } from "@/hooks/getLogin";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  username?: string | undefined;
}

export default function LoginOrLogout({ username }: Props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  function handleLogout() {
    cookie.remove("username");
    if (pathname === "/") window.location.reload();
    else router.push("/");
  }

  return username ? (
    <button onClick={handleLogout}>로그아웃</button>
  ) : (
    <Link href="/login">로그인</Link>
  );
}
