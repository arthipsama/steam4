export interface productData {
    productid: string;
    ImgProduct: string;
    ProductName: string;
    price: number;
    Description: string;
    quantity: number;
    categoryproductid: number;
    category?:category;
    CreateBy?: string;
    CreateDate?: Date;
    UpdateBy?: string;
    UpdateDate?: Date | null;
    saleprice?:number;
    view?: number;
    salecount?: number;
    CategoryProductName?: string;
}
export interface category {
    categoryproductid: number;
    CategoryProductName: string;


}