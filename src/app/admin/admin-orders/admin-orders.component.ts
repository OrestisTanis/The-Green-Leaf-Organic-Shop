import { UserService } from '../../shared/services/user.service';
import { Order } from '../../shared/models/order';
import { OrderService } from '../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders: any;
  orderSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private orderService: OrderService, private userService: UserService) {
    this.orderSubscription = this.orderService.getOrders().snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({          
          id: a.key,username:"", ...a.payload.val() 
        }))
    )).subscribe(orders => {
      this.orders = orders;  

      for (let order of this.orders){
        this.userSubscription = this.userService.getUser(order.userId)
        .valueChanges()
        .subscribe(appUser=>{          
          order.username = appUser.name;
        });
        
      }
    });  
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.orderSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }


}
