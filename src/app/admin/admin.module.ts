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
    RouterModule.forChild([ 
      {path: 'admin/products/new', component: ProductFormComponent,      
      data: {
        title: 'New Product',
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
      }, canActivate: [AuthGuardService,AdminAuthGuardService]}, 
      {path: 'admin/products/:id', component: ProductFormComponent,      
      data: {
        title: 'New Product',
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
      }, canActivate: [AuthGuardService,AdminAuthGuardService]},
      {path: 'admin/products', component: AdminProductsComponent,      
      data: {
        title: 'Admin Products',
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
      }, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/orders', component: AdminOrdersComponent,      
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
          }
        ]
      }, canActivate: [AuthGuardService,AdminAuthGuardService]},         
    ])
  ]
})
export class AdminModule { }
