import { ShoppingItem } from './../models/shopping-item';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../models/product';
import { map, switchMap, take } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Product[] = []; 
  productSubscription: Subscription;  
  selectedCategory: string;
  filteredProducts$ : Product[] = [];
  cart$: Observable<ShoppingCart>;
  cartSubscription: Subscription;
  quantitySum$;

  constructor(private productService: ProductService, private categoryService: CategoryService,
     private route: ActivatedRoute,
     private shoppingCartService: ShoppingCartService) { 
    this.productSubscription=this.productService.getAllProducts()
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({          
          id: a.key, ...a.payload.val() 
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

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    // console.log(this.cart$);
    // (await this.shoppingCartService.getCart()).pipe(take(1)).subscribe(cart => this.cart = cart);
  }
  
  ngOnDestroy() {
    this.productSubscription.unsubscribe();   
    this.cartSubscription.unsubscribe(); 
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
