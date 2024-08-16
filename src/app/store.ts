import {create} from 'zustand';

interface QuantityState {
    quantity: number,
    setsQuantity: (newQuantity: number) => void;
}

export const useStore = create<QuantityState>((set) => ({
  quantity: 0, // 초기 값 설정
  setsQuantity: (newQuantity: number) => set((state)=>({ quantity: newQuantity })), // quantity 업데이트 함수
}));