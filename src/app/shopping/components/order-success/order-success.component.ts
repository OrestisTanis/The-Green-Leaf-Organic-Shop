import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from '../../../shared/models/app-user';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  orderId: string;
  order: any;
  appUser$: Observable<AppUser>;
  userSubscription: Subscription;
  sub: Subscription;
  orderSuccess:boolean;

  constructor(private orderService: OrderService,
    private authService: AuthService, 
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("id")

    this.userSubscription = this.orderService.getOrderbyId(this.orderId).snapshotChanges()
    .pipe(
      map(a =>
       ( { id: a.key, username:"", ...a.payload.val() } )))
      .pipe(
       switchMap(order => {
       this.order = order;
       return this.userService.getUser(this.order.userId)
       .valueChanges()
       })
    )
    .subscribe(appUser=>{          
      this.order.username = appUser.name;       
    })
 
    if (this.router.url.includes("order-success")){
      this.orderSuccess = true;
    }
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
