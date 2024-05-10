import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { MessageResponse } from "../types/api-types";

interface PropsType{
    user:User | null
}

const Header = ({user}:PropsType) => {

    const [isOpen,setIsOpen]=useState<boolean>(false);

    const logOutHandler=async()=>{
        try{
            await signOut(auth);
            toast.success("Signed Out Successfully");
            setIsOpen(false);
        }catch(error){
            toast.error("Signed out Failed");
            const message=error as MessageResponse;
            console.log(message);

        }
    }

    console.log("User...",user?._id);

  return (
    <nav className="header">

        <Link to={"/"} onClick={()=>setIsOpen(false)}>Home</Link>
        <Link to={"/search"}>
            <FaSearch/>
        </Link>

        <Link to={"/cart"} onClick={()=>setIsOpen(false)}>
            <FaShoppingBag/>
        </Link>

        {user?._id ? 
        (<>
            <button onClick={()=>setIsOpen((prev)=>!prev)}>
                <FaUser/>
            </button>

            <dialog open={isOpen}>
                <div>
                    {user.role==="admin" && (
                        <Link to="/admin/dashboard" onClick={()=>setIsOpen(false)}>Admin</Link>
                    )}
                </div>

                <Link to="/orders" onClick={()=>setIsOpen(false)}>Orders</Link>

                <button onClick={logOutHandler}>
                    <FaSignOutAlt/>
                </button>
            </dialog>

        </>):
        (<Link to={"/login"}><div>Login <FaSignInAlt/></div></Link>)}
      
    </nav>
  )
}

export default Header
