import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/store";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import { Navigate } from "react-router-dom";
import { getLastMonths } from "../../../utils/features";
import { Skeleton } from "../../../components/Loader";


const {last12Months,last6Months}=getLastMonths();
console.log(last6Months);
const Barcharts = () => {


  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data:BarData, isError } = useBarQuery(user?._id!);

  const charts=BarData?.charts;

  const products=charts?.products || [];
  const orders=charts?.orders || [];
  const users=charts?.users || [];

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {
          isLoading?<Skeleton/>:
          <>
            <section>
            <BarChart
              data_2={users}
              data_1={products}
              labels={last6Months}
              title_1="Products"
              title_2="Users"
              bgColor_1={`hsl(260, 50%, 30%)`}
              bgColor_2={`hsl(360, 90%, 90%)`}
            />
            <h2>Top Products & Top Customers</h2>
          </section>

          <section>
            <BarChart
              horizontal={true}
              data_1={orders}
              data_2={[]}
              labels={last12Months}
              title_1="Orders"
              title_2=""
              bgColor_1={`hsl(180, 40%, 50%)`}
              bgColor_2=""
            />
            <h2>Orders throughout the year</h2>
          </section>
          </>
        }
      </main>
    </div>
  );
};

export default Barcharts;
