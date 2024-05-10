import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { NewOrderRequest } from "../types/api-types";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerIntitialState, UserReducerIntitialState } from "../types/reducer-types";
import { RootState } from "@reduxjs/toolkit/query";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { responseToast } from "../utils/features";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm=()=>{

  const navigate=useNavigate();

  const stripe=useStripe();
  const elements=useElements();

  const {user}=useSelector((state:{userReducer:UserReducerIntitialState})=>state.userReducer);

  const {
    shippingInfo,
    cartItem,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  }=useSelector((state:{cartReducer:CartReducerIntitialState})=>state.cartReducer);

  const [isProcessing,setIsProcessing]=useState<boolean>(false);

  const [newOrder]=useNewOrderMutation();
  const dispatch=useDispatch();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItem,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id!,
    };
  
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      //indian export system not letting to pay
      await newOrder(orderData);
      navigate("/orders");
      return toast.success(error.message || "Something Went Wrong");  
    }

    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      dispatch(resetCart());
      responseToast(res, navigate, "/orders");
    }
    setIsProcessing(false);
  };
  
  
  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <PaymentElement/>
        <button type="submit" disabled={isProcessing}>
          {
            isProcessing?"Processing...":"Pay"
          }
        </button>
      </form>
    </div>
  )
}

const Checkout = () => {
  return (
    <Elements options={{
      clientSecret:"pi_3PDirbSA8BqN3oKP1laO7l4P_secret_RtlXBK6JZHDKzDH4TTnEbVZ5O",
    }}
     stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>
  )
}

export default Checkout;
