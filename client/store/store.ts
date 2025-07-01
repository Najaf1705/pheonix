import {create} from "zustand";

type CounterStore={
    count: number;
    increment: ()=>void;
    decrement: ()=>void;
    isLoggedIn?: boolean;
    setLoginStatus?: (status: boolean) => void;
}

export const useCounterStore=create<CounterStore>((set)=>({
    isLoggedIn: false,
    setLoginStatus: (status: boolean) => set({isLoggedIn: status}),
    count: 0,
    increment: ()=>{
        set(state=>({count: state.count+1}))
    },
    decrement: ()=>{
        set(state=>({count: state.count-1}))
    },
}));