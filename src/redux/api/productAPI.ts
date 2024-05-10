import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductResponse, CategoriesProductResponse, DeleteProductRequest, MessageResponse, NewProductRequest, SearchProductRequest, SearchProductResponse, UpdateProductRequest, productDetailsResponse } from "../../types/api-types";
import Search from "../../pages/Search";
import { query } from "firebase/database";


export const productAPI=createApi({
    reducerPath:"productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`}),
    tagTypes:["product"],
    endpoints:(builder)=>({
        latestProduct:builder.query<AllProductResponse,string>({
            query:()=>"latest",
            providesTags:["product"]
        }),
        allProducts:builder.query<AllProductResponse,string>({
            query:(id)=>`admin-products?id=${id}`,
            providesTags:["product"]
        }),
        categories:builder.query<CategoriesProductResponse,string>({
            query:()=>`categories`,
            providesTags:["product"]
        }),
        searchProducts:builder.query<SearchProductResponse,SearchProductRequest>({
            query:({price,search,sort,category,page})=>{

                let base=`all?search=${search}&page=${page}`;

                if(price) base += `&price=${price}`;
                if(sort) base+=`&sort=${sort}`;
                if(category) base+=`&category=${category}`;
                
                return base;
            },
            providesTags:["product"]

        }),
        productDetails:builder.query<productDetailsResponse,string>({
            query:(id)=>`${id}`,
            providesTags:["product"],
        }),
        newProducts:builder.mutation<MessageResponse,NewProductRequest>({
            query:({formData,id})=>({
                url:`new?id=${id}`,
                method:"POST",
                body:formData,

            }),
            invalidatesTags:["product"],
        }),
        updateProduct:builder.mutation<MessageResponse,UpdateProductRequest>({
            query:({formData,id,userId})=>({
                url:`${id}?id=${userId}`,
                method:"PUT",
                body:formData
            }),
            invalidatesTags:["product"],
        }),

        deleteProduct:builder.mutation<MessageResponse,DeleteProductRequest>({
            query:({id,userId})=>({
                url:`${id}?id=${userId}`,
                method:"DELETE",
            }),
            invalidatesTags:["product"],
        }),
    }),
});



export const {
    useLatestProductQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
    useNewProductsMutation,
    useProductDetailsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
}=productAPI;