import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../services/shopping-cart-service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  

  constructor(private shoppingCartService: ShoppingCartService) {
    
   }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    
  } 

  async clearCart(){
    await this.shoppingCartService.clearCart();
  }

  
}