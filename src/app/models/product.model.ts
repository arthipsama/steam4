export interface productData {
    productid: string;
    ImgProduct: string;
    ProductName: string;
    // Fullprice?: number;
    price: number;
    Description: string;
    quantity: number;
    categoryproductid: number;
    category?:category;
    saleprice?:number;
}
export interface category {
    categoryproductid: number;
    CategoryProductName: string;


}