
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../shared/services/shopping-cart-service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
    ) { 
    this.subscription = auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  openLogoutModal(content) {
    this.modalService.open(content, { centered: true });    
    this.closeNavbar();
  }
  
  closeNavbar() {
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
