"use client";
import styles from "@/styles/login/login.module.css";
import axios from "axios";
import { useRef } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  function handleSubmit() {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, null, {
        params: {
          username: idRef.current?.value,
          password: pwRef.current?.value,
        },
      })
      .then((res) => {
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/userDto`, {
            headers: {
              Authorization: res.headers["authorization"],
            },
          })
          .then((res) => {
            cookie.set("username", res.data.split(" ")[0]);
          })
          .catch((err) => {
            console.error("userDto error", err);
          });
        router.push(`/`);
        router.refresh();
      })
      .catch(() => {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      });
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <span>로그인을 진행해 주세요</span>
        </div>
        <div className={styles.inputWrapper}>
          <input
            ref={idRef}
            placeholder="아이디를 입력하세요"
            onKeyDown={handleKeyDown}
          />
          <input
            type="password"
            ref={pwRef}
            placeholder="비밀번호를 입력하세요"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.btnWrapper}>
          <button onClick={handleSubmit}>계속 진행하기</button>
        </div>
      </div>
    </div>
  );
}
