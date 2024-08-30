import CheckRes from "@/components/home/CheckRes";
import Main from "@/components/home/Main";
import SearchFlight from "@/components/home/SearchFlight";

export default function Home() {
    return (
        <div style={{marginBottom:"-239px"}}>
            <Main/>
            <SearchFlight/>
            <CheckRes/>
        </div>
    )
}
