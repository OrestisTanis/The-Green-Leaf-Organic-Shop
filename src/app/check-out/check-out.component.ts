import { ShoppingItem } from './../models/shopping-item';
import { Shipping } from './../models/shipping';
import { ShoppingCartService } from './../services/shopping-cart-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: any;
  shipping: Shipping = {name:"", address:"",telnum:null, city:""};
  subscription:Subscription;
  constructor(private shoppingCartService: ShoppingCartService ) {
    
  }

  async ngOnInit() {    
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeOrder(f: NgForm){
    
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.itemsArr
        .map(item =>{
          return {
            product: {
              title: item.name,
              imageUrl: item.imageUrl,
              price: item.price,
            },
            quantity: item.quantity,
            totalPrice: item.TotalPrice
          }
        })
    }    
    f.resetForm();
    
  }

}
