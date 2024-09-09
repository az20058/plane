"use client";
interface ButtonProp {
    handleSubmit: () => void;
    msg: string;
}

export default function BlueButton({handleSubmit, msg}:ButtonProp) {
    return (
        <div>
            <button onClick={handleSubmit}
            style={{backgroundColor:"#2067D1", color:"white", borderRadius:"9px", padding:"12px 20px", fontSize:"18px",
            fontFamily:"Pretendard", fontWeight:"700"
            }}>{msg}</button>
        </div>
    )
}