import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({

  imports: [
    CommonModule
    
  ],
  declarations: [
    ProductQuantityComponent,
    ProductCardComponent
  ],
  exports: [
    ProductQuantityComponent,
    ProductCardComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    OrderService
  ]
  
})
export class SharedModule { }
