import { ReactElement , useState } from "react"
import { Column } from "react-table"
import TableHOC from "../components/admin/TableHOC"
import { Link } from "react-router-dom"

type DataType={
  _id:string,
  amount:number,
  quantity:number,
  discount:number,
  status:ReactElement,
  action:ReactElement,
}

const column: Column<DataType>[]=[
  {
    Header:"ID",
    accessor:"_id"
  },
  {
    Header:"Quantity",
    accessor:"quantity"
  },
  {
    Header:"Discount",
    accessor:"discount"
  },
  {
    Header:"Amount",
    accessor:"amount"
  },
  {
    Header:"Status",
    accessor:"status"
  },
  {
    Header:"Action",
    accessor:"action"
  },
]
const Orders = () => {
  const order=[1];

  const [rows]=useState<DataType[]>([
    {    
      _id:"60544666833",
      amount:50000,
      quantity:3,
      discount:400,
      status:<span className="red">Processing</span>,
      action:<Link to="/order/60544666833">View</Link>,
    }
  ]

  );

  const Table=TableHOC<DataType>(column,rows,"dashboard-product-box","Orders",
  order.length>6?true:false)()

  

  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  )
}

export default Orders
