import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div className="container not-found">
      <h1>Page not Found</h1>
      <MdError/>
    </div>
  )
}

export default NotFound;
