import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../../services/shopping-cart-service';
import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product:Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  cartId: string;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    this.cartService.updateCart(this.product,1);
  }
  
}
