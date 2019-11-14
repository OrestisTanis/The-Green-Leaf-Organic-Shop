import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';
import { SharedModule } from './../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';


@NgModule({    
  declarations: [
    AdminOrdersComponent,
    ProductFormComponent,
    AdminProductsComponent,    
  ],
  providers: [
    AuthGuardService, 
    AdminAuthGuardService
  ],
  imports: [
    SharedModule,
    // BEGIN ADMIN MODULE ROUTES
    RouterModule.forChild([ 
      // BEGIN ROUTE
      {path: 'admin/products/new', component: ProductFormComponent,        
       data: {                          
        title: 'New Product',
        // BEGIN BREADCRUMB DATA
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Manage Products',
            url: 'admin/products'
          },
          {
            label: 'Add New Product',
            url: 'admin/products/new'
          }
        ]
        // END BREADCRUMB DATA
      }, canActivate: [AuthGuardService,AdminAuthGuardService]}, 
      // END ROUTE

      // BEGIN ROUTE
      {path: 'admin/products/:id', component: ProductFormComponent,      
      data: {
        title: 'New Product',
        // BEGIN BREADCRUMB DATA
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Manage Products',
            url: 'admin/products'
          },
          {
            label: 'Edit Product',
            url: 'admin/products/:id'
          }
        ]
        // END BREADCRUMB DATA
      }, canActivate: [AuthGuardService,AdminAuthGuardService]},
      // END ROUTE

      // BEGIN ROUTE
      {path: 'admin/products', component: AdminProductsComponent,      
      data: {
        title: 'Admin Products',
        // BEGIN BREADCRUMB DATA
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Manage Products',
            url: 'admin/products'
          }
        ]
        // END BREADCRUMB DATA
      }, canActivate: [AuthGuardService, AdminAuthGuardService]},
      // END ROUTE

      // BEGIN ROUTE
      {path: 'admin/orders', component: AdminOrdersComponent,      
      data: {
        title: 'Admin View Order',
        // BEGIN BREADCRUMB DATA
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Manage Orders',
            url: 'admin/orders'
          }
        ]
        // END BREADCRUMB DATA
      }, canActivate: [AuthGuardService,AdminAuthGuardService]},  
      // END ROUTE       
    ])
    // END ADMIN MODULE ROUTES
  ]
})
export class AdminModule { }
