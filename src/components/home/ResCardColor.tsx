import styles from '@/styles/home/checkRes.module.css';

interface ResColorProps {
    airLineNm: string;
    flightCode: string;
}

export default function ResCardColor({airLineNm, flightCode}: ResColorProps) {
    const color: {[key:string]: string } = {
        "제주항공": "linear-gradient(-77deg, #DC3500, #FF6A33)",
        "대한항공": "linear-gradient(-77deg, #0F6FFF, #014A94)",
        "아시아나항공": "linear-gradient(-77deg, #FF3370, #FF0000)",
        "진에어": "linear-gradient(-77deg, #BDD600, #C54279)",
        "이스타항공": "linear-gradient(-77deg, #FF003A, #8D0020)"
    }

    return (
        <div className={`${styles.flightNum}`} style={{background:color[airLineNm]}}>
            <div>
                <span>#항공편명 {flightCode.slice(8)}</span>
            </div>
        </div>
    )
}