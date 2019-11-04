
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../shared/models/product';
import { map, switchMap, take } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = []; 
  subscription: Subscription;  
  selectedCategory: string;
  filteredProducts$ : Product[] = [];
  cart$: Observable<ShoppingCart>;  
 

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) { }
  
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();    
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();  
  }

  filterByCategory(category: string){
    this.filteredProducts$ = category ? this.products.filter(p => p.category === category) : this.products;     
  }

  populateProducts(){
    this.subscription=this.productService.getAllProducts()
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({          
          id: a.key, ...a.payload.val() 
        }))
    ))
    .pipe(switchMap(products => { 
      this.products = products;
      return this.route.queryParamMap;
     }))     
    .subscribe(params => {
      this.selectedCategory = params.get('category');
      this.filterByCategory(this.selectedCategory);
    });
  }

}
