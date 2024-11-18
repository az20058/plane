"use client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import BlueButton from "@/containers/BluButton";
import { useStore } from "@/store/store";

interface FlightProps {
  planeId: string;
  depTime: string;
  arrTime: string;
  date: string;
  airLine: string;
  depCity: string;
  arrCity: string;
  msg: string;
  payPrice: number;
}

export default function Pay({
  planeId,
  depTime,
  arrTime,
  date,
  airLine,
  depCity,
  arrCity,
  msg,
  payPrice,
}: FlightProps) {
  const { setArr, setDep, setDepCity, setArrCity } = useStore();
  const param = useSearchParams();
  const quantity = param.get("quantity");
  const router = useRouter();

  //console.log(flightId);
  async function processPay() {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/flight`,
      {
        airLine,
        date,
        flightId: planeId,
        depTime,
        arrTime,
        payPrice,
        depCity,
        arrCity,
      }
    );
    const id = await res.data;

    setArr(arrTime.toString());
    setDep(depTime.toString());
    setDepCity(depCity);
    setArrCity(arrCity);

    router.push(`/reservation/?id=${id}&quantity=${quantity}`);
  }

  return <BlueButton handleSubmit={processPay} msg={msg} />;
}
