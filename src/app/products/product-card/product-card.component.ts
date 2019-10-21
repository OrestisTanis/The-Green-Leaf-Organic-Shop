import { ShoppingCartService } from '../../services/shopping-cart-service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product:Product;
  @Input('show-actions') showActions = true;
  cartId: string;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(product){
    this.cartService.addToCart(product);
    
  }

}
