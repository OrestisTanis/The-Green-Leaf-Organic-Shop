import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { faFilter, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { OrderBy } from 'src/app/shared/models/orderBy';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnDestroy {
  categories$: any[];
  categorySubscription: Subscription;
  selectedCategories: string[] = [];
  public isCollapsed = false; // Flag for Filter Collapse
  orderBy = OrderBy.None; // Enum for pointing Order of Products

  // Font-Awesome Icons
  faSortUp = faSortUp; 
  faSortDown = faSortDown; 
  faFilter = faFilter;

  // Send data to parent component
  @Output() categoryValueChange = new EventEmitter<string[]>();
  @Output() orderValueChange = new EventEmitter<OrderBy>();

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
 
  // Called when the user clicks on any of the 'Order by Price' buttons
  setFilter(event){    
    if (this.selectedCategories.includes(event.target.name))
    {
      let index = this.selectedCategories.indexOf(event.target.name);
      this.selectedCategories.splice(index,1);
    }
    else {
      this.selectedCategories.push(event.target.name)
    }
    this.categoryValueChange.emit(this.selectedCategories);
  }

  // Called when the user clicks on 'Order by Price: Ascending" button
  orderAscending(){
    if(this.orderBy !== OrderBy.Ascending)
    {
      this.orderBy = OrderBy.Ascending;
      this.orderValueChange.emit(this.orderBy);
    }
    else{
      this.orderBy = OrderBy.None;
      this.orderValueChange.emit(this.orderBy);
    }
  }

  // Called when the user clicks on 'Order by Price: Descending" button
  orderDescending(){
    if(this.orderBy !== OrderBy.Descending)
    {
      this.orderBy = OrderBy.Descending;
      this.orderValueChange.emit(this.orderBy);
    }
    else{
      this.orderBy = OrderBy.None;
      this.orderValueChange.emit(this.orderBy);
    }
  }

  ngOnDestroy() {    
    this.categorySubscription.unsubscribe;
  }

}
