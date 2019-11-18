import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../services/shopping-cart-service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  

  constructor(private shoppingCartService: ShoppingCartService,
    private modalService: NgbModal) {}

  async ngOnInit() {
    console.log(this.cart$);
    this.cart$ = await this.shoppingCartService.getCart();
  } 

  // async clearCart(){
  //   await this.shoppingCartService.clearCart();
  // }

  openClearCartModal(content) {
    this.modalService.open(content, { centered: true });    
  }
  
}
