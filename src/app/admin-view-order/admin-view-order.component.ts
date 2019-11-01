import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.scss']
})
export class AdminViewOrderComponent implements OnInit, OnDestroy { 
  order;
  orderId:string;
  subscription: Subscription;
  totalPrice;

  constructor(private orderService: OrderService, 
    private userService: UserService, 
    private route: ActivatedRoute){}     


  

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.subscription = this.orderService.getOrderbyId(this.orderId).valueChanges()
    .pipe(switchMap(order => {
      this.order = order;  
      console.log(this.order);
      return this.userService.getUser(this.order.userId).valueChanges()
    })).subscribe(appUser=>{          
      this.order.username = appUser.name;
    });
  }

  ngOnDestroy() {
    if(this.subscription)
    this.subscription.unsubscribe();
   
  }

  getPrice():number{
    let sum = 0;
    for (let item of this.order.items){
      sum += item.totalPrice;
    }
    return sum;
  }

  printPage(){
    window.print();
  }
}
