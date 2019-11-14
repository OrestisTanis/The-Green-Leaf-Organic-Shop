import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Product } from '../shared/models/product';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ShoppingItem } from '../shared/models/shopping-item';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {
  cart: any;  
  subscription: Subscription;
  
  
  constructor(private db : AngularFireDatabase) { }

  private createCart(){   // Create entry in DB
    return this.db.list('/shopping-carts').push({
      dateCreateD : new Date().getTime()
    });
  }
  
  getItem(cartId, productId: string): AngularFireObject<ShoppingItem>{ 
    return this.db.object('/shopping-carts/'+cartId+"/items/"+productId);
  }
  
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCart();
   
    let cart$:AngularFireObject<ShoppingCart> = this.db.object('/shopping-carts/'+cartId);
    return cart$.valueChanges().pipe(
      map(cart=>{         
        return new ShoppingCart(cart.items);
      })
    );
    
  }

  private async getOrCreateCart():Promise<string>{
    let cartId = localStorage.getItem('cartID');    

    // Check for existing cart
    if(!cartId){  
      let result = await this.createCart();
      localStorage.setItem("cartID", result.key);
      return result.key;
    }    
    // Get the Cart
    return cartId;
  }
  
  async updateCart(product: Product, change: number){
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(cartId, product.id); 

    item$.valueChanges().pipe(take(1))
      .subscribe(item => {        
        if(item){
          let quantity = item.quantity + change;
          if (quantity === 0) return item$.remove();    // Deleting item from DB
          else return item$.update({quantity:quantity}) //Modify quantity of existing item
        }
        return item$.update({product, quantity:1})      //Creating item in DB  
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async clearCart(){
    let cartId = await this.getOrCreateCart();
    
    return this.db.list('/shopping-carts/'+cartId+'/items').remove();
  }
}
