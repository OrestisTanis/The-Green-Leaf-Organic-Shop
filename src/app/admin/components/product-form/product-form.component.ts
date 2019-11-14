import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnDestroy{
  categories$:Observable<any>;
  onSubmitError:boolean=false;
  product={};
  creatingNewProduct=true;  // Flag to dintinguish between Creation/Update of a product
  id; // If any, we get it from the params

  private subscription: Subscription;

  constructor(private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router, 
    private route:ActivatedRoute) { 

    this.categories$ = this.categoryService.getCategories().valueChanges();
    
    this.checkId();
  }

  checkId(){      // Checks is there is an ID passed through url params
    this.id=this.route.snapshot.paramMap.get('id');
    if (this.id){
      this.subscription = this.productService.getProduct(this.id).valueChanges().subscribe(p => this.product = p);
      this.creatingNewProduct = false;
    }
    else { this.creatingNewProduct=true;}
  }
  
  onSubmit(f: NgForm) {
    if (f.valid)
    {
      this.onSubmitError=false;
      this.productService.saveProduct(f.value);  
      this.router.navigate(['/admin/products']);
    }
    else { 
      this.onSubmitError=true;
      console.log("form invalid");
    }
  }

  updateProduct(){    // Called when the user clicks on 'Update Product' button
    this.productService.updateProduct(this.product,this.id);
    this.router.navigate(['/admin/products']);
  }

  deleteProduct(){    // Called when the user clicks on 'Delete Product' button
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy(){
    if (this.subscription) this.subscription.unsubscribe();    
  }

}
