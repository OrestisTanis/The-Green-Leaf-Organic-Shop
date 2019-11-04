import { CategoryService } from '../../shared/services/category.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit, OnDestroy {
  categories$: any;
  categorySubscription: Subscription;
  @Input('selectedCategory') selectedCategory : string;
  

  constructor(private categoryService: CategoryService) {

    this.categorySubscription = this.categoryService.getCategories().snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({          
          key: a.key, ...a.payload.val() 
        }))
    )).subscribe(categories => {
      this.categories$ = categories;         
      
    });
   }
  ngOnInit() {
  }

  ngOnDestroy() {    
    this.categorySubscription.unsubscribe;
  }

}
