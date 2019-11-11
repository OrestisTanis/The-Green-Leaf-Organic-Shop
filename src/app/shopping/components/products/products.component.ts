import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { map, switchMap, take } from 'rxjs/operators';
import { ShoppingCartService } from '../../../services/shopping-cart-service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = []; 
  subscription: Subscription;  
  selectedCategories: string[];
  filteredProducts$ : Product[] = [];
  cart$: Observable<ShoppingCart>;  
  faSearch = faSearch; //font-awesome icon

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

  filterByCategory(categories: string[]){

    if (categories && categories.length!==0){
      var temp = [];
      for (let category of categories){
          temp = temp.concat(this.products.filter(p => p.category === category));
      }
      this.filteredProducts$ = temp;
    }
    else {
      this.filteredProducts$ = this.products;
    }
  }

  populateProducts(){

    this.subscription = this.productService.getAllProducts()
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
      let h = params.get('category');
      this.filteredProducts$ = this.products;
    });
  }

}
