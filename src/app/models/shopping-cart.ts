import { ShoppingItem } from './shopping-item';

export class ShoppingCart{
    

    constructor(public items:ShoppingItem[]){ }

    get TotalItemCount(){
      let count=0;      
      for (let productId in this.items){
        count += this.items[productId].quantity;        
      }      
      return count;
    }

}