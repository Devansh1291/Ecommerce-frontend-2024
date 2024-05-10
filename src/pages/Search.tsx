import { useState } from "react"
import ProductCart from "../components/ProductCart";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { server } from "../redux/store";
import { Skeleton } from "../components/Loader";
import { useDispatch } from "react-redux";
import { CartItems } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";


const Search = () => {

  const {data:categoriesResponse,isLoading:loadingCategories,isError,error}=useCategoriesQuery("");

  console.log("categoriesResponse...",categoriesResponse?.products);

  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("");
  const [maxPrice,setMaxPrice]=useState(100000);
  const [category,setCategory]=useState<string>("");
  const [page,setPage]=useState(1);

  const dispatch=useDispatch();

  const {isLoading:productLoading,data:searchedData,isError:productIsError,error:productError}=useSearchProductsQuery({search,sort,category,page,price:maxPrice})

  const addToCartHandler=(cartItem:CartItems)=>{
    if(cartItem.stock<1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));

    toast.success("Added to Cart");
  }

  const isNextPage=page<4;
  const isPrevPage=page>1;

  if(isError){
    toast.error((error as CustomError).data.message);
  }

  if(productIsError){
    toast.error((productError as CustomError).data.message);
  }

  return (
    <div className="product-search-page">
      <aside>
        <h1>Filters</h1>

        <div>
          <p>Sort</p>
          <select name="sort" value={sort} 
          onChange={(e)=>setSort(e.target.value)}>
            <option value="">Select</option>
            <option value="asc">Price(low to high)</option>
            <option value="dsc">Price(high to low)</option>
          </select>
        </div>

        <div>
          <p>MaxPrice: {maxPrice || ""}</p>
          <input type="range" name="maxPrice" value={maxPrice}
          onChange={(e)=>setMaxPrice(Number(e.target.value))} min="0"
          max="100000"/>
        </div>

        <div>
          <p>Category</p>
          <select
          name="category" value={category}
          onChange={(e)=>setCategory(e.target.value)}
          >
            <option value="">All</option>
            {
              loadingCategories===false && 
              ( 
                categoriesResponse?.products.map((i)=>(
                <option key={i} value={i}>{i.toUpperCase()}</option>
                ))
              )
            }
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        
        
        <input
          type="text"
          name="search" 
          placeholder="Search by Name..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        

          {
            productLoading?<Skeleton length={10} width="80vw"/>:(
              <div className="search-product-list">
              {
                searchedData?.products.map((i)=>(
                  <ProductCart 
                    productId= {i._id}
                    name={i.name} 
                    price={i.price} 
                    stock={i.stock} 
                    handler={addToCartHandler} 
                    photo={i.photo}
                  />
                ))
              }
          </div>
            )
          }

          {
            searchedData && searchedData.totalPage>1 && (
              <article>
              <button disabled={!isPrevPage}
              onClick={()=>setPage((prev)=>prev-1)}
              >Prev</button>
              <span>{page} of {searchedData?.totalPage}</span>
              <button disabled={!isNextPage} onClick={()=>setPage((prev)=>prev+1)}>Next</button>
            </article>
            )
          }

      </main>

    </div>
  )
}

export default Search
