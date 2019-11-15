import { Product } from './product';

export class ShoppingItem{
 
  constructor( public product: Product, public quantity:number){ }

  get TotalPrice(): number {
    return this.product.price*this.quantity;
  }
}