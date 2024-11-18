import { create } from "zustand";

interface QuantityState {
  quantity: number;
  setsQuantity: (newQuantity: number) => void;
  price: number;
  setPrice: (newPrice: number) => void;
  arr: string;
  dep: string;
  setArr: (newArr: string) => void;
  setDep: (newDep: string) => void;
  depCity: string;
  arrCity: string;
  setDepCity: (newDepCity: string) => void;
  setArrCity: (newArrCity: string) => void;
}

export const useStore = create<QuantityState>((set) => ({
  quantity: 0, // 초기 값 설정
  setsQuantity: (newQuantity: number) =>
    set((state) => ({ quantity: newQuantity })), // quantity 업데이트 함수
  price: 0,
  setPrice: (newPrice: number) => set((state) => ({ price: newPrice })),
  arr: "",
  dep: "",
  setArr: (newArr: string) => set((state) => ({ arr: newArr })),
  setDep: (newDep: string) => set((state) => ({ dep: newDep })),
  depCity: "",
  arrCity: "",
  setDepCity: (newDepCity: string) => set((state) => ({ depCity: newDepCity })),
  setArrCity: (newArrCity: string) => set((state) => ({ arrCity: newArrCity })),
}));
