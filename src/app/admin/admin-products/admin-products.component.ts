import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];  
  filteredProducts: Product[];
  subscription: Subscription;
 

  constructor(private productService: ProductService) {    

    this.subscription=this.productService.getAllProducts().snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
    )).subscribe(products => {
      this.filteredProducts = this.products = products;     
    });

    

    // this.subscription = this.productService.getAllProducts().snapshotChanges()
    // .pipe(map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) as Product);
    // }))
    // .subscribe(products => this.filteredProducts = this.products = products); console.log(this.products);
   
  }


  filter(query: string){
    // this.filteredProducts = (query) ?
    //   this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
    //   this.products;

      if (query) {
        this.filteredProducts = this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));        
      }
      else {
        this.filteredProducts=this.products;
      }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}
