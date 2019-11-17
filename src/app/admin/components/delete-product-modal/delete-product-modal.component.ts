import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.scss']
})
export class DeleteProductModalComponent {  
  @Input('id') id: string;
  //Font-Awesome Icons 
  faLeaf = faLeaf;


  constructor(private authService : AuthService,
    private router:Router,
    private productService: ProductService,
    private modalService: NgbModal) { }


  deleteProduct(){
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
    this.modalService.dismissAll();
  }

  closeModal() {
    this.modalService.dismissAll();
  }


}
