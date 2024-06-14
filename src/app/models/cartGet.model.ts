export interface cartGet{
    id:number;
    userId:number;
    productId:number;
    quantity:number;
    totalPrice:number;

    //Data from Stock
    productName:string;
    brand:string;
    price:number;
    discount:number;
    discription:string;
    img1:string;
}