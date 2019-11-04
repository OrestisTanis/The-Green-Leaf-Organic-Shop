import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../../services/shopping-cart-service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input('product') product:Product;  
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  cartId: string;
  

  constructor(private cartService: ShoppingCartService) { }


  addToCart(){
    this.cartService.updateCart(this.product,1);
  }

  removeFromCart(){
    this.cartService.updateCart(this.product,-1);
  }

  
}
