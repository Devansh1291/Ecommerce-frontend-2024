import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItems } from "../types/types";

type ProductProps={
    productId:string,
    photo:string,
    name:string,
    price:number,
    stock:number,
    handler:(cartItem: CartItems) => string | undefined
};

// const server="goku";

const ProductCart = ({productId,
  photo,
  name,
  price,
  stock,
  handler}:ProductProps) => {
  return (
    <div className="productcard">
        <img src={`${server}/${photo}`} alt={name}/>
        <p>{name}</p>
        <span>${price}</span>

        <div>
            <button onClick={()=>handler({
              name,
              price,
              stock,
              photo,
              productId,quantity:1,
            })}>
                <FaPlus/>
            </button>
        </div>

    </div>
  )
}

export default ProductCart
