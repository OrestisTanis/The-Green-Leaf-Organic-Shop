import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingItem } from '../models/shopping-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {
  cart: any;
  items$: unknown;
  subscription: Subscription;
  
  
  constructor(private db : AngularFireDatabase) { }

  private createCart(){   
    return this.db.list('/shopping-carts').push({
      dateCreateD : new Date().getTime()
    });
  }

  private getCart(cartId: string){
    return this.db.object('/shopping-carts/'+cartId);
  }
  
  getProduct(productKey){
    return this.db.object('/shopping-carts/items/'+productKey);
  }
  

  private addProduct(cartId: string, product: Product){
    return this.db.object('/shopping-carts/'+cartId+"/items/"+product.id);
  }


  private async getOrCreateCart():Promise<string>{
    let cartId = localStorage.getItem('cartID');    

    if(!cartId){ // Check for existing cart
      let result = await this.createCart();
      localStorage.setItem("cartID", result.key);
      return result.key;
    }    
      //Get the Cart
      return cartId;
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCart();
    let item$: AngularFireObject<ShoppingItem> =  this.db.object('/shopping-carts/'+cartId+"/items/"+product.id);

    item$.valueChanges().pipe(take(1))
      .subscribe(item => {
        if(item){
          //Increase  quantity
          console.log("Increasing quantity to "+(item.quantity+1));
          return item$.update({quantity:item.quantity + 1})
          
        }
        //else new item
        console.log("Quantity: 1");
        return item$.update({product, quantity: 1})        
      })
  }
    

  


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
