import { AdminViewOrderComponent } from './components/admin-view-order/admin-view-order.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { AdminAuthGuardService } from '../admin/services/admin-auth-guard.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({

  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {path: 'admin/orders/:id', component: AdminViewOrderComponent,      
      data: {
        title: 'Admin View Order',
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Manage Orders',
            url: 'admin/orders'
          },
          {
            label: 'View Order',
            url: 'admin/orders/:id'
          }
        ]
      }, canActivate: [AuthGuardService,AdminAuthGuardService]},          
    ]),
  ],
  declarations: [
    ProductQuantityComponent,
    ProductCardComponent,
    AdminViewOrderComponent
  ],
  exports: [
    ProductQuantityComponent,
    ProductCardComponent,
    AdminViewOrderComponent    
  ],
  providers: [
    AdminAuthGuardService,
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    OrderService
  ]
  
})
export class SharedModule { }
