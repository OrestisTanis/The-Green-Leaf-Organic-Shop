import { ShoppingCart } from './shopping-cart';

export class Order {

  datePlaced: number;
  items: { 
      product: { 
          title: string;
          imageUrl: string; 
          price: number; 
      }; 
      quantity: number; 
      totalPrice: number; 
  }[];

  constructor(public shipping:any, public userId:string, shoppingCart: ShoppingCart){
    this.datePlaced = new Date().getTime();
    this.userId = (userId || "guest"); 
    this.items = shoppingCart.itemsArr
      .map(item =>{
        return {
          product: {
            title: item.product.name,
            imageUrl: item.product.imageUrl,
            price: item.product.price,
          },
          quantity: item.quantity,
          totalPrice: item.TotalPrice   
        }
      })
  }
}