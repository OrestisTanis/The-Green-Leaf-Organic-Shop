import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../../services/shopping-cart-service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product:Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  cartId: string;
  

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartService.updateCart(this.product,1);
  }
  
}
