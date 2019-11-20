import { ShoppingCartService } from '../../../shared/services/shopping-cart-service';
import { Component, OnInit} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {  
  cartSubscription:Subscription;
  cart$: Observable<ShoppingCart>;
  

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {    
    this.cart$ = await this.shoppingCartService.getCart();
  }



}
