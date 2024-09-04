import styles from '@/styles/login/signUp.module.css';
import { MutableRefObject } from 'react';

interface UserForm {
    idRef: MutableRefObject<HTMLInputElement|null>,
    pwRef: MutableRefObject<HTMLInputElement|null>,
    emailRef: MutableRefObject<HTMLInputElement|null>,
    phoneRef: MutableRefObject<HTMLInputElement|null>,
    birthRef: MutableRefObject<HTMLInputElement|null>
}

export default function SignUpInput({idRef, pwRef, emailRef, phoneRef, birthRef}:UserForm) {
    return (
        <div className={styles.inputWrapper}>
            <input ref={idRef} placeholder='아이디를 입력하세요'/>
            <input type='password' ref={pwRef} placeholder='비밀번호를 입력하세요'/>
            <input ref={emailRef} placeholder='이메일 주소를 입력하세요'/>
            <input ref={phoneRef} placeholder='전화번호를 입력하세요'/>
            <input ref={birthRef} placeholder='생년월일을 입력하세요'/>
        </div>
    )
}