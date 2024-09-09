"use client";

interface Click {
    onClick: () => void;
}

export default function SearchBtn({onClick}:Click) {
    return (
        <button onClick={onClick} style={{backgroundColor:"#2067D1", height:"55px", display: "flex",
            alignItems:"center",
            justifyContent:"center",
            padding:"12px 20px",
            color:"white",
            borderRadius:"6px"
         }}>검색</button>
    )
}