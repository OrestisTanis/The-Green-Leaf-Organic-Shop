import { Product } from 'src/app/models/product';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy{
  categories$;
  onSubmitError:boolean=false;
  product={};
  creatingNewProduct=true;
  id;

  private subscription: Subscription;

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private route:ActivatedRoute) { 
    this.categories$ = this.categoryService.getCategories().valueChanges();
    
    this.id=this.route.snapshot.paramMap.get('id');
    if (this.id){
      this.subscription = this.productService.getProduct(this.id).valueChanges().subscribe(p => this.product = p);
      this.creatingNewProduct = false;
    }
    else { this.creatingNewProduct=true;}
  }

  onSubmit(f: NgForm) {
    if (f.valid) //console.log(f.value);
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

  updateProduct(){    
    this.productService.updateProduct(this.product,this.id);
    this.router.navigate(['/admin/products']);
    
  }

  deleteProduct(){
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy(){
    if (this.subscription) this.subscription.unsubscribe();
    
  }

  ngOnInit() {
  }

}
