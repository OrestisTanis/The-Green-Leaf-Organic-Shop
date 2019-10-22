import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingItem } from './../models/shopping-item';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable, OnDestroy } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import { Product } from '../models/product';
import { Subscription, from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {
  cart: any;  
  subscription: Subscription;
  
  
  constructor(private db : AngularFireDatabase) { }

  private createCart(){   
    return this.db.list('/shopping-carts').push({
      dateCreateD : new Date().getTime()
    });
  }

  getItem(cartId, productId: string): AngularFireObject<ShoppingItem>{
    this.getOrCreateCart();    
    console.log(this.db.object('/shopping-carts/'+cartId+"/items/"+productId));
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

    if(!cartId){ // Check for existing cart
      let result = await this.createCart();
      localStorage.setItem("cartID", result.key);
      return result.key;
    }    
      //Get the Cart
      return cartId;
  }
  
  async updateCart(product: Product, change: number){
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(cartId, product.id); 

    item$.valueChanges().pipe(take(1))
      .subscribe(item => {
        if(item){
          //Modify quantity of existing item
          console.log("Modifying quantity to "+(item.quantity+change));
          return item$.update({quantity:item.quantity + change})
        }
        //new item
        console.log("Quantity: 1");
        return item$.update({product, quantity:1})        
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
