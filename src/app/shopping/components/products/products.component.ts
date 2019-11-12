import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { map, switchMap, take } from 'rxjs/operators';
import { ShoppingCartService } from '../../../services/shopping-cart-service';
import { faSearch, faTintSlash } from '@fortawesome/free-solid-svg-icons';


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
  shownProducts$ : Product[] = [];
  cart$: Observable<ShoppingCart>;  

  // Font-Awesome Icons
  faSearch = faSearch; 

  // Pagination
  activePage: number = 1;
  itemsPerPage: number = 4;
  numberOfPages: number;
  pageArray(n: number): any[] {
    return Array(n);
  }

  
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

    // Finding the Number of Pages
    
    this.numberOfPages = (this.filteredProducts$.length)%2 == 0 ?
    Math.floor(this.filteredProducts$.length/this.itemsPerPage) + 1 :
    Math.floor(this.filteredProducts$.length/this.itemsPerPage) + 1;
    console.log("number of pages: "+this.numberOfPages);

    this.populatePageProducts();

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
      this.filteredProducts$ = this.shownProducts$ = this.products;

      this.activePage = 1;

      this.populatePageProducts();

      // Finding the Number of Pages
      this.numberOfPages = (this.products.length)%2 == 0 ?
        this.shownProducts$.length/this.itemsPerPage :
        Math.floor(this.products.length/this.itemsPerPage) + 1;
      // console.log("number of pages: "+this.numberOfPages);
      
      
    });
  }

  populatePageProducts(){
    let sliceIndex = (this.activePage-1)*this.itemsPerPage;
      this.shownProducts$ = this.filteredProducts$.slice(sliceIndex,sliceIndex + this.itemsPerPage);
      console.log("sliceIndex: "+sliceIndex )
  }

  goToPage(pageNumber){    
    if (pageNumber!==this.activePage){
      
      this.activePage = pageNumber;

      this.populatePageProducts();
    }
  }

  goToFirstPage(){
    if (this.activePage !== 1){
    this.activePage = 1;

    this.populatePageProducts();
    }
  }

  goToLastPage(){
    if(this.activePage !== this.numberOfPages){
      this.activePage = this.numberOfPages;

      this.populatePageProducts();;

    }
    
  }

}
