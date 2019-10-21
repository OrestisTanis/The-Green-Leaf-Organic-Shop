import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Product[] = []; 
  productSubscription: Subscription;
  categorySubscription: Subscription;
  selectedCategory: string;
  filteredProducts$ : Product[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) { 
    this.productSubscription=this.productService.getAllProducts()
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({          
          key: a.key, ...a.payload.val() 
        }))
    ))
    .pipe(switchMap(products => { 
      this.products$ = products;
      this.filteredProducts$ = products;   
      return route.queryParamMap;
     }))     
    .subscribe(params => {
      this.selectedCategory = params.get('category');
      this.filterByCategory(this.selectedCategory);
    });
    
  }

  ngOnInit() {
    //
  }
  
  ngOnDestroy() {
    this.productSubscription.unsubscribe;    
  }

  filterByCategory(category: string){
    if (category) {      
      this.filteredProducts$ = this.products$.filter(p => p.category === category);
      
    }
    else {
      this.filteredProducts$ = this.products$;
      
    }



  }
}
