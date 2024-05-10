import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerIntitialState} from "../types/reducer-types";
import { addToCart, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { CartItems } from "../types/types";
import { calculatePrice } from "../redux/reducer/cartReducer";
import axios from "axios";
import { server } from "../redux/store";


const Cart = () => {

  let {cartItem,subtotal,tax,total,shippingCharges,discount}=useSelector((state:{cartReducer:CartReducerIntitialState})=>state.cartReducer);

  const dispatch=useDispatch();


  const [couponCode,setCouponCode]=useState<string>("");
  const [isValidCouponCode,setIsValidCouponCode]=useState<boolean>(false);

  const incrementHandler=(cartItem:CartItems)=>{
    if(cartItem.quantity>=cartItem.stock) return;
    if(cartItem.quantity===0) dispatch(removeCartItem(cartItem.productId));
    dispatch(addToCart({...cartItem,quantity:cartItem.quantity+1}))
  }

  const decrementHandler=(cartItem:CartItems)=>{
    if(cartItem.quantity<=1) return;

    dispatch(addToCart({...cartItem,quantity:cartItem.quantity-1}))
  }

  const removeHandler=(id:string)=>{
    dispatch(removeCartItem(id));
  }

  useEffect(()=>{

    const {token:cancelToken,cancel}=axios.CancelToken.source();

    const timeOutID=setTimeout(()=>{
      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{
        cancelToken
      })
      .then((res)=>{
        dispatch(discountApplied(res.data.discount?.[0].amount));
        setIsValidCouponCode(true);
        dispatch(calculatePrice());
      })
      .catch(()=>{
        dispatch(discountApplied(0));
        dispatch(calculatePrice());
        setIsValidCouponCode(false);
      })
    },1000);
    return ()=>{
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    }
  },[couponCode]);

  useEffect(()=>{
    dispatch(calculatePrice());
  },[cartItem]);

  return (
    <div className="cart">
      <main>
        {
          cartItem.length>0 ?
          (
            cartItem.map((i, idx) => (
              <CartItem 
              key={idx} 
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              cartItem={i}/>
            ))
          ):
          (
            <h1>No Items Added</h1>
          )
        }

      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: -<em>₹{discount}</em>
        </p>
        <p><b>Total: ₹{total}</b></p>

        <input type="text" placeholder="COUPON"
        value={couponCode}
        onChange={(e)=>setCouponCode(e.target.value)}
        />

        {
          couponCode && (isValidCouponCode 
          ? (<span className="green">₹{discount} off using  the <code>{couponCode}</code></span>)
          :(<span className="red">Invalid Coupon <VscError/></span>))
        }


        {
          cartItem.length>0 &&(
            <Link to={"/shipping"}>Checkout</Link>
          )
        }

      </aside>

      
    </div>
  )
}

export default Cart
