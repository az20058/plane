import CheckRes from "@/components/home/CheckRes";
import Main from "@/components/home/Main";
import SearchFlight from "@/components/home/SearchFlight";

export default function Home() {
    return (
        <div style={{marginBottom:"-239px"}}>
            <Main/>
            {/* //검색페이지
            //예약내역확인 페이지 */}
            <SearchFlight/>
            <CheckRes/>
        </div>
    )
}
