import {create} from "zustand";

type Shipment={
    id: string;
    date: string;
    status: string;
    quantity: number;
}

type User={
    name: string;
    email:string;
    shipments: Shipment[];
}

type Store={
    user: User|null;
    setUser: (user: User|null)=>void;
    isLoggedIn: boolean;
    setLoginStatus: (status: boolean)=>void;

}

export const userStore=create<Store>((set)=>({
    user: null,
    setUser: (user: User|null)=>set({user}),
    isLoggedIn: false,
    setLoginStatus: (status: boolean)=>set({isLoggedIn: status})
}))