"use client";
import Image from "next/image";
import styles from "../../styles/footer.module.css";
import vector from "../../../public/images/vector.svg";
import footerLogo from "../../../public/images/footerLogo.svg";
import Link from "next/link";
import LoginOrLogout from "../navbar/LoginOrLogout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { usegetLogin } from "@/hooks/getLogin";

export default function Footer() {
  const [username, setUsername] = useState<string | undefined>("");
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setUsername(usegetLogin());
    console.log("change path");
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.logoWrapper}>
          <Image src={footerLogo} alt="footerLogo" />
        </div>
        <div className={styles.menu}>
          <span>내역</span>
          <Link href="/checkRes">구매 내역</Link>
          <button>탑승객 정보</button>
        </div>
        <div className={styles.menu}>
          <span>정보</span>
          <LoginOrLogout username={username} />
          <Link href="/signUp">회원가입</Link>
        </div>
        <div className={styles.vector}>
          <Image src={vector} alt="vector" />
        </div>
      </div>
    </div>
  );
}
