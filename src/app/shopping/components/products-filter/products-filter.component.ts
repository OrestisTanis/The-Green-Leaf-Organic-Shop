import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { faFilter, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { OrderBy } from 'src/app/shared/models/orderBy';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit, OnDestroy {
  categories$: any;
  categorySubscription: Subscription;
  selectedCategories: string[] = [];
  public isCollapsed = false;
  orderBy = OrderBy.None;

  // Font-Awesome Icons
  faSortUp = faSortUp; 
  faSortDown = faSortDown; 
  faFilter = faFilter;

  // @Input('selectedCategory') selectedCategory : string;
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
  ngOnInit() {
  }

  ngOnDestroy() {    
    this.categorySubscription.unsubscribe;
  }

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

}
