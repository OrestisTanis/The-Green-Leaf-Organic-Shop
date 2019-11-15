
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../services/shopping-cart-service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';


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
  isCollapsed: boolean = true;      // Flag for Navbar Toggle

  //Font-Awesome Icons
  faShoppingCart = faShoppingCart;
  faLeaf = faLeaf;

  constructor(private auth: AuthService, 
    private shoppingCartService: ShoppingCartService,
    ) { 
    this.subscription = auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  logout() {
    this.auth.logout();
  }
  
  closeNavbar () {
    let element: HTMLElement = document.getElementsByClassName( 'navbar-toggler' )[ 0 ] as HTMLElement;
    if ( element.getAttribute( 'aria-expanded' ) == 'true' ) {
        element.click();
    }
  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
