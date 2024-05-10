import { CartItems, User, ShippingInfo } from "./types";

export interface UserReducerIntitialState{
    user:User | null,
    loading:boolean,
}

export interface CartReducerIntitialState{
    loading:boolean,
    cartItem:CartItems[],
    subtotal:number,
    tax:number,
    shippingCharges:number,
    discount:number,
    total:number,
    shippingInfo:ShippingInfo,
}