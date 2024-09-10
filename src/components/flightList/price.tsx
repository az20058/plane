import { cookies } from "next/headers"

interface ChargeProps {
    economyCharge: number,
}

export default function Price({economyCharge}:ChargeProps) {
    const cookie = cookies();
    const username = cookie.get("username")?.value;

    return (
        //로그인을 하면 두번째 p태그에 할인가격 표출
        <div>
            <p style={username?{textDecoration:"line-through", textDecorationColor:"red"}:{}}>{economyCharge} 원</p>
            {username?<p style={{color:"red"}}>{economyCharge*0.9} 원</p>:<p></p>}
        </div>
    )
}