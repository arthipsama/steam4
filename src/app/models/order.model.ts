import { productData } from "./product.model";
import { userData } from "./user.models";

export interface OrderDTO {
    ordersid: number;
    userid: number;
    user: userData;
    totalprice: string;
    productcode: string;
    image: string;
    paymentstatus: string;
    remark: string;
    CreateBy: string;
    CreateDate: Date;
    UpdateBy: string;
    UpdateDate: Date | null;
    [key: string]: any;
  }

  export interface OrderDetailDTO {
    orderdetailid: number;
    ordersid: number;
    orders: OrderDTO;
    productid: number;
    product: productData;
    quantity: string;
    price: string;
    CreateBy: string;
    CreateDate: Date;
    UpdateBy: string;
    UpdateDate: Date | null;
    [key: string]: any;
  }