import { ShoppingItem } from './shopping-item';
import { Product } from './product';

export class ShoppingCart{
    itemsArr : ShoppingItem[] = [];

    constructor(public items: ShoppingItem[] ){
      for (let i in items){         
        let item = items[i];
        this.itemsArr.push(new ShoppingItem(item.product, item.quantity));     
      }       
    }

    get ProductIds(){
      return Object.keys(this.items);
    }

    get Items(){
      return this.items;
    }

    get TotalItemCount(){
      let count=0;      
      for (let productId in this.items){
        count += this.items[productId].quantity;        
      }      
      return count;
    }

    get TotalPrice() : number{
      let sum= 0;
      for (let item of this.itemsArr){
        sum += item.TotalPrice;
      }
      return sum;
    }

    getQuantity(product:Product) {      
      if (this.items)    
      var item = this.items[product.id];      
    
      return item ? item.quantity: 0;
    }

    
    

}