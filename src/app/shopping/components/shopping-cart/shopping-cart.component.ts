import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart-service';
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
    this.cart$ = await this.shoppingCartService.getCart();
  } 

  openClearCartModal(content) {
    this.modalService.open(content, { centered: true });    
  }
  
}
