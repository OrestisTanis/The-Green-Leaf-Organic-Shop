import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Shipping } from '../shared/models/shipping';
import { Subscription } from 'rxjs';
import { Order } from '../shared/models/order';
import { NgForm } from '@angular/forms';
import { OrderService } from '../shared/services/order.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: any;
  shipping: Shipping = {name:"", address:"",telnum:null, city:""};  
  authSubscription: Subscription;
  userId:string;

  constructor(private orderService: OrderService, 
    private authService: AuthService,
    private router:Router) {
    
  }

  async ngOnInit() {   
    this.authSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  async placeOrder(f: NgForm){
    let order = new Order(f.value, this.userId, this.cart);

    f.resetForm();  
    let result = await this.orderService.placeOrder(order); //save to firebase  
    console.log("order success");
    this.router.navigate(["/order-success", result.key]);
  }

}
