import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../redux/reducer/cartReducer";
import { CartItems } from "../types/types";
type CartItemProps={
    cartItem:CartItems,
    incrementHandler:(cartItem:CartItems)=>void,
    decrementHandler:(cartItem:CartItems)=>void,
    removeHandler:(id:string)=>void,
}

const CartItem = ({cartItem,incrementHandler,decrementHandler,removeHandler}:CartItemProps) => {

    const {productId,name,photo,price,quantity,stock}=cartItem;
    const dispatch=useDispatch();
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name}/>
      <article>
        <Link to={`product/{productId}`}>
            {name}
        </Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={()=>decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={()=>incrementHandler(cartItem)}><div>+</div></button>
      </div>

      <button onClick={()=>removeHandler(productId)}><FaTrash/></button>
    </div>
  )
}

export default CartItem