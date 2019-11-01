import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { OrderService } from './../services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: any;
  orderSubscription: Subscription;
  userSubscription: Subscription;
  

  constructor(private orderService: OrderService, private userService: UserService, private authService: AuthService) {
    
    this.orderSubscription = this.authService.user$.pipe(
      switchMap(u => {
        return this.orderService.getOrderByUser(u.uid).snapshotChanges();
      })
    )
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
