import { Bar, Category, Line, Order, OrderItem, Pie, Product, Stats, User } from "./types";
import { CartItems } from "./types";
import { ShippingInfo } from "./types";

export type MessageResponse={
    success:boolean,
    message:string,
}


export type CustomError={
    status:number,
    data:{
        success:boolean,
        message:string,
    }
}

export type UserResponse={
    success:boolean,
    user:User
}

export type AllProductResponse={
    success:boolean,
    message:string,
    products:Product[]
}

export type CategoriesProductResponse={
    success:boolean,
    products:string[],
}

export type SearchProductResponse={
    success:boolean,
    products:Product[],
    totalPage:number,
}

export type SearchProductRequest={
    price:number;
    category:string;
    page:number;
    search:string;
    sort:string;
}

export type NewProductRequest={
    id:string,
    formData:FormData;
}

export type productDetailsResponse={
    success:boolean,
    product:Product,
    message:string;
}

export type UpdateProductRequest={
    userId:string;
    id:string;
    formData:FormData;
}
export type DeleteProductRequest={
    userId:string;
    id:string;
}

export type NewOrderRequest = {
    shippingInfo: ShippingInfo;
    orderItems: CartItems[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    user: string;
  };

export type AllOrderResponse={
    success:boolean,
    orders:Order[],

}

export type OrderDetailResponse={
    success:boolean,
    order:Order,
}

export type UpdateRequest={
    userId:string,
    orderId:string,
}

export type DeleteUserRequest={
    userId:string,
    adminUserId:string,
}

export type allUsersResponse={
    success:boolean,
    message:string,
    users:User[],
}

export type StatsResponse={
    success:boolean,
    stats:Stats,
}

export type PieResponse={
    success:boolean,
    charts:Pie,
}

export type BarResponse={
    success:boolean,
    charts:Bar,
}

export type LineResponse={
    success:boolean,
    charts:Line,
}