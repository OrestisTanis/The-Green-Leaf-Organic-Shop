import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';





@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];  
  //filteredProducts: Product[];
  subscription: Subscription;  
  displayedColumns = ["position","name","category","price","key"]

  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;  

  dataSource: MatTableDataSource<Product>;
   // MatPaginator Inputs  
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 100];
 
  

  constructor(private productService: ProductService) {    

    this.subscription=this.productService.getAllProducts().snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({          
          id: a.key, ...a.payload.val() 
        }))
    )).subscribe(products => {
      this.products = products;         
      
      this.dataSource = new MatTableDataSource(products);  
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });   
  }


  filter(query: string){

    // this.filteredProducts = (query) ?
    //   this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
    //   this.products;

      if (query) {
        //this.filteredProducts = this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));   
        this.dataSource.data = this.products.filter(p => 
          (p.name).toLowerCase().includes(query.toLowerCase()) || (p.category).toLowerCase().includes(query.toLowerCase())
        ); 
      }
      else {
        //this.filteredProducts=this.products;
        this.dataSource.data = this.products;
      }
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

  
}

