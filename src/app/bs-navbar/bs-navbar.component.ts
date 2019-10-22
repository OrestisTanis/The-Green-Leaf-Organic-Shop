import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart-service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  cartItemCount: number;
  subscription: Subscription;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService ) { 
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      console.log("User: "+appUser);
    });

    
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
