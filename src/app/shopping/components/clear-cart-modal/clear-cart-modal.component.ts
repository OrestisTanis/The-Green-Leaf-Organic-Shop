import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartService } from '../../../shared/services/shopping-cart-service';

@Component({
  selector: 'clear-cart-modal',
  templateUrl: './clear-cart-modal.component.html',
  styleUrls: ['./clear-cart-modal.component.scss']
})

export class ClearCartModalComponent {
  //Font-Awesome Icons 
  faLeaf = faLeaf;

  constructor(private modalService: NgbModal,
    private shoppingCartService: ShoppingCartService) { }

  async clearCart(){
    await this.shoppingCartService.clearCart();
    this.closeModal();
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
