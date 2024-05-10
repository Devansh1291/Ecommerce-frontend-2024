import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerIntitialState } from "../../types/reducer-types";
import { CartItems, ShippingInfo } from "../../types/types";

const initialState:CartReducerIntitialState={
    loading:false,
    cartItem:[],
    subtotal:0,
    tax:0,
    shippingCharges:0,
    discount:0,
    total:0,
    shippingInfo:{
        address:"",
        state:"",
        city:"",
        country:"",
        pincode:"",
    }
}

export const cartReducer=createSlice({
    name:"cartReducer",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<CartItems>)=>{
            state.loading=true;
            const index=state.cartItem.findIndex((i)=>i.productId === action.payload.productId);
            if(index!==-1) state.cartItem[index]=action.payload;
            else state.cartItem.push(action.payload);
            state.loading=false;

        },
        removeCartItem:(state,action:PayloadAction<string>)=>{
            state.loading=true;
            state.cartItem=state.cartItem.filter((i)=>i.productId !== action.payload);
            state.loading=false;
        },
        calculatePrice:(state)=>{

            const subtotal=state.cartItem.reduce((total,item)=>total+(item.price*item.quantity),0);

            state.subtotal=subtotal;
            state.shippingCharges=state.subtotal>1000?0:200;
            state.tax=Math.round(state.subtotal*0.18);
            state.total=state.subtotal+state.tax+state.shippingCharges-
                        state.discount;

        },
        discountApplied:(state,action:PayloadAction<number>)=>{
            state.discount=action.payload;
        },
        saveShippingInfo:(state,action:PayloadAction<ShippingInfo>)=>{
            state.shippingInfo=action.payload;
        },
        resetCart:()=>initialState,
    }
});

export const {addToCart,removeCartItem,calculatePrice,discountApplied,saveShippingInfo,resetCart}=cartReducer.actions;
