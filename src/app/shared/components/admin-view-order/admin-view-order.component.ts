import { AuthService } from '../../services/auth.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { AppUser } from '../../models/app-user';

@Component({
  selector: 'admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.scss']
})
export class AdminViewOrderComponent implements OnInit, OnDestroy {
  @Input("orderSuccess") orderSuccess : boolean = false;   
  orderId: string;
  order;
  subscription: Subscription;
  appUser$: Observable<AppUser>;  
  faPrint = faPrint; // Font-Awesome Icon

  constructor(private orderService: OrderService, 
    private userService: UserService, 
    private route: ActivatedRoute,
    private authService: AuthService,
    ){} 

  ngOnInit() {        
    this.orderId = this.route.snapshot.paramMap.get("id");

    this.subscription = this.orderService.getOrderbyId(this.orderId).valueChanges()
    .pipe(switchMap(order => {
      this.order = order; 
      return this.userService.getUser(this.order.userId).valueChanges()
    }))
    .subscribe(user=>{          
      this.order.username = user.name;
    });

    this.appUser$ = this.authService.appUser$;
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
