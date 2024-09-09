"use client";
import BlueButton from "@/containers/BluButton";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RefundProp {
    msg: string,
    data: number[]
}

export default function Refund({msg, data}:RefundProp) {
    const router = useRouter();

    async function handleRefund() {
        console.log(data)
        if(data.length>1) {
            if(window.confirm("함께 예약한 모든 좌석이 환불됩니다.")){
                data.map(item=>{
                    axios.put((`${process.env.NEXT_PUBLIC_SERVER_URL}/refund/${item}`),{
                        buyTime: null,
                        isRes: "false",
                        username: "temp",
                        email: null,
                        resKey: null,
                    })
                        .then(()=>{
                            alert("환불 처리 되었습니다.");
                            router.refresh();
                        })
                        .catch(()=>{
                            alert("오류가 발생했습니다.");
                            return;
                        })
                })
            }
        }
        else {
            if(window.confirm("환불 하시겠습니까?")) {
                data.map(item=>{
                    axios.put((`${process.env.NEXT_PUBLIC_SERVER_URL}/refund/${item}`),{
                        buyTime: null,
                        isRes: "false",
                        username: "temp",
                        email: null,
                        resKey: null,
                    })
                    .catch(()=>{
                        alert("오류가 발생했습니다.");
                        router.refresh();
                        return;
                    })
                })
                alert("환불 처리 되었습니다.");
            }
        }
    }
    
    return (
        <BlueButton msg={msg} handleSubmit={handleRefund}/>
    )
}