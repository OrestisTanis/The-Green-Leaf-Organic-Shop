import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';



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
    CommonModule,
    FormsModule,
    MatTableModule,    
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,
    MatSortModule,
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
      }, canActivate: [AuthGuardService,AdminAuthGuardService]}       
    ])
  ]
})
export class AdminModule { }
