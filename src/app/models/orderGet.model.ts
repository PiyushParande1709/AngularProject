export interface orderGet{
    id:number;
    userId:number;
    productId:number;
    orderNumber:string;
    quantity:number;
    totalPrice:number;
    status:string;
    orderDate:Date;

    //Data from Stoock table 
    productName:string;
    brand:string;
    discount:number;
    discription:string;
    img1:string;

    //Data from user table
    fullName:string;
    address:string;
}