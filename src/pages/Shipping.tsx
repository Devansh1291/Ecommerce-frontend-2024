import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerIntitialState } from "../types/reducer-types";
import axios from "axios";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";


const Shipping = () => {

  let {cartItem,total}=useSelector((state:{cartReducer:CartReducerIntitialState})=>state.cartReducer);

    const [shippingInfo,setShippingInfo]=useState(
        {
            address:"",
            city:"",
            state:"",
            country:"",
            pincode:"",
        }
    );

    const navigate=useNavigate();
    const dispatch=useDispatch(); 

    if(cartItem.length<=0) return navigate("/cart");

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setShippingInfo((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler=async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      dispatch(saveShippingInfo(shippingInfo));

      try{

        const {data}=await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/payment/create`,{
          amount:total,
          description:"Payment for goods/services",
        },{
          headers:{
            "Content-Type":"application/json",
          }

        });

        console.log(data.clientSecret);

        navigate("/pay",{
          state:data.clientSecret,
        });

      }catch(error){
        console.log(error);
        toast.error("Something Went Wrong");
      }
    }

    useEffect(()=>{
      if(cartItem.length<=0) return navigate("/cart");

    },[cartItem]);

  return (
    <div className="shipping">
      <button className="back-btn" onClick={()=>navigate("/cart")}>
        <BiArrowBack/>
      </button>

      <form onSubmit={submitHandler}>
        <h1>Shipping</h1>
        <input
        type="text" name="address" value={shippingInfo.address}
        placeholder="Address"
        onChange={changeHandler}
        required
        />

        <input
        type="text" name="city" value={shippingInfo.city}
        placeholder="City"
        onChange={changeHandler}
        required
        />

        <input
        type="text" name="state" value={shippingInfo.state}
        placeholder="State"
        onChange={changeHandler}
        required
        />

        <select name="country" required 
        value={shippingInfo.country}
        onChange={changeHandler}
        >
            <option value="" disabled={true}>Choose Country</option>
            <option value="India">India</option>
            <option value="">China</option>
        </select>

        <input
        type="number" name="pincode" value={shippingInfo.pincode}
        placeholder="Pincode"
        onChange={changeHandler}
        required
        />

        <button type="submit">
            Pay Now
        </button>
      </form>
    </div>
  )
}

export default Shipping;
