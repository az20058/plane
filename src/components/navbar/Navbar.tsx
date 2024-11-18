"use client";
import styles from "../../styles/navbar.module.css";
import Image from "next/image";
import navLogo from "../../../public/images/navLogo.svg";
import Link from "next/link";
import UserInfo from "./UserInfo";
import LoginOrLogout from "./LoginOrLogout";

export default function Navbar() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.menuWrapper}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={navLogo} alt="Logo in Navbar" />
          </Link>
        </div>
        <div className={styles.menuItem}>
          <LoginOrLogout />
        </div>
        <div className={styles.menuItem}>
          <Link href="/signUp">회원가입</Link>
        </div>
        <div className={styles.menuItem}>
          <Link href="/checkRes">구매 내역</Link>
        </div>
      </div>
      <UserInfo />
    </div>
  );
}
