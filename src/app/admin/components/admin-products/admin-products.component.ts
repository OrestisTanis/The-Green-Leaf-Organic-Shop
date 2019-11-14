import { ProductService } from '../../../shared/services/product.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];    
  subscription: Subscription;  

  // MatTable
  displayedColumns = ["position","name","category","price","id"]
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;  
  dataSource: MatTableDataSource<Product>;
   // MatPaginator 
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

  // Filter table by query
  filter(query: string){

    this.dataSource.data = (query) ?
    this.products.filter(p =>(p.name).toLowerCase().includes(query.toLowerCase()) || (p.category).toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

  
}

