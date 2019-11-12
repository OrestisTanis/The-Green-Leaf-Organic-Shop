import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { faFilter, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

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

  // Font-Awesome Icons
  faSortUp = faSortUp; 
  faSortDown = faSortDown; 
  faFilter = faFilter;

  // @Input('selectedCategory') selectedCategory : string;
  @Output() valueChange = new EventEmitter<string[]>();

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
    this.valueChange.emit(this.selectedCategories);
  }

}
