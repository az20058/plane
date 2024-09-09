import Image from 'next/image'

interface AirLine {
    airlineNm: string,
    flightCode: string,
    height: number
}

export default function AirLine({airlineNm, flightCode, height}:AirLine) {
    const logo: {[key:string]: string } = {
        "제주항공": "/images/jeju.svg",
        "대한항공": "/images/koreanAir.svg",
        "아시아나항공": "/images/asiana.svg",
        "진에어": "/images/jinAir.svg",
        "이스타항공": "/images/eastar.svg"
    }
    
    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            {/* <span>{airlineNm}</span> */}
            <Image src={logo[airlineNm]} alt='logo' width={180} height={height}/>
            {flightCode?<span>{flightCode}</span>:""}
        </div>
    )
}