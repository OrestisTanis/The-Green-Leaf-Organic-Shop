import { OrderBy } from './../../../shared/models/orderBy';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { map, switchMap, take } from 'rxjs/operators';
import { ShoppingCartService } from '../../../shared/services/shopping-cart-service';
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
  shownProducts$ : Product[] = [];
  cart$: Observable<ShoppingCart>;  
  query: string ="";
  orderBy: OrderBy.None;

  // Font-Awesome Icons
  faSearch = faSearch; 

  // Pagination
  activePage: number = 1;
  itemsPerPage: number = 4;
  numberOfPages: number;
  result: string;
  pageArray(n: number): any[] {
    return Array(n);
  }

  
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) { }
  
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.orderBy = OrderBy.None;
    this.populateProducts();    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  
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

      this.populatePageProducts(this.filteredProducts$);
      
      this.setPageNumber(this.filteredProducts$);
    });
  }

  // Called when user types a query
  filterByKeyWord(query: string){    
    this.shownProducts$ = (query) ?
    this.filteredProducts$.filter(p =>(p.name).toLowerCase().includes(query.toLowerCase()) || (p.category).toLowerCase().includes(query.toLowerCase())) :
    this.filteredProducts$;
    
    this.setPageNumber(this.shownProducts$);
    
    this.checkActivePage();  

    let finalProds = this.applyPriceFilter(this.shownProducts$);

    this.populatePageProducts(finalProds);

    this.result=query;
  }

  //Check query value to clear filter
  modelChange(query){
    if (query==""){
      this.filterByKeyWord("");
    }
  }

  // Called when the user filters results by category
  filterByCategory(categories: string[]){
    if (categories && categories.length!==0){
      let temp = [];
      for (let category of categories){
          temp = temp.concat(this.products.filter(p => p.category === category));
      }
      this.filteredProducts$ = temp;
    }
    else {
      this.filteredProducts$ = this.products;
    }

    let finalProds = this.applyPriceFilter(this.filteredProducts$);

    if(this.query){      
      this.filterByKeyWord(this.query);
    }
    else {
      this.setPageNumber(finalProds);
      
      this.checkActivePage();  
      
      this.populatePageProducts(finalProds);
    }

  }

  // Set the maximum number of pages
  setPageNumber(products : Product[]){
    this.numberOfPages = (products.length)%4 == 0 ?
      products.length/this.itemsPerPage :
      Math.floor(products.length/this.itemsPerPage) + 1;
  }

  // Ensure that the active page number is smaller than the maximum number of pages
  checkActivePage(){
    this.activePage = this.activePage > this.numberOfPages? 1 : this.activePage;
  }

  // Populate page with products
  populatePageProducts(products : Product[]){
    let sliceIndex = (this.activePage-1)*this.itemsPerPage;
    this.shownProducts$ = products.slice(sliceIndex,sliceIndex + this.itemsPerPage);

    
      
  }

  // Jump to page
  goToPage(pageNumber){    
    if (pageNumber!==this.activePage){
      this.activePage = pageNumber;
      this.scrollToTop();
      this.populatePageProducts(this.filteredProducts$);
    }
  }
 

  // Jump to 1st page
  goToFirstPage(){
    if (this.activePage !== 1){
      this.activePage = 1;
      this.scrollToTop();
      this.populatePageProducts(this.filteredProducts$);
    }
  }

  // Jump to last page
  goToLastPage(){
    if(this.activePage !== this.numberOfPages){
      this.activePage = this.numberOfPages;
      this.scrollToTop();
      this.populatePageProducts(this.filteredProducts$);;
    }
  }

  // Called when the user clicks on a price filter
  filterByPrice(event){    
    
    // Apply filter on different selection   
    this.orderBy = event;
    let finalProds = this.applyPriceFilter(this.filteredProducts$);
    

    this.populatePageProducts(finalProds);
  }

  applyPriceFilter(prods: Product[]): Product[]{
    let result;

    if(this.query){ // In case of search query
      let temp = this.shownProducts$.slice();
      if(OrderBy[this.orderBy] == "Ascending")
        return result = temp.sort((a,b) => (a.price > b.price) ? 1 : -1);
      else if(OrderBy[this.orderBy] == "Descending")
        return result = temp.sort((a,b) => (a.price > b.price) ? -1 : 1);
      else         
      return prods;
    }
    else {  // In case of no search query
      let temp = prods.slice();
      if(OrderBy[this.orderBy] == "Ascending")
        return result = temp.sort((a,b) => (a.price > b.price) ? 1 : -1);
      else if(OrderBy[this.orderBy] == "Descending")
        return result = temp.sort((a,b) => (a.price > b.price) ? -1 : 1);
      else         
        return prods;
    }    
  }

  
  scrollToTop() {    
    let body = document.body; // Safari
    let html = document.documentElement; // Chrome, Firefox, IE and Opera places the overflow at the <html> level, unless else is specified. Therefore, we use the documentElement property for these browsers

    body.scrollTop -= 10000;
    html.scrollTop -= 10000;
  }
  
}
