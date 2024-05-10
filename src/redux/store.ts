import {configureStore} from "@reduxjs/toolkit";
import { UserApi } from "./api/UserApi";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";
import { dashboardApi } from "./api/dashboardAPI";

export const server=import.meta.env.VITE_SERVER

export const store=configureStore({
    reducer:{
        [UserApi.reducerPath]:UserApi.reducer,
        [userReducer.name]:userReducer.reducer  ,
        [productAPI.reducerPath]:productAPI.reducer,
        [cartReducer.name]:cartReducer.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [dashboardApi.reducerPath]:dashboardApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UserApi.middleware,productAPI.middleware,orderApi.middleware,dashboardApi.middleware),
});
    
export type RootState=ReturnType<typeof store.getState>;