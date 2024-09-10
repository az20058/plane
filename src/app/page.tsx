"use client";
import CheckRes from "@/components/home/CheckRes";
import Main from "@/components/home/Main";
import SearchFlight from "@/components/home/SearchFlight";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const [view, setView] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(divRef, view);
        if (view&&divRef.current) {
            divRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log("ㅎㅇ");
        }
    }, [view]);
    
    return (
        <div style={{marginBottom:"-239px"}}>
            <Main setView={setView}/>
            {view?
            <>
            <SearchFlight scrollRef={divRef}/>
            <CheckRes/>
            </>
            :
            <></>
            }
        </div>
    )
}
