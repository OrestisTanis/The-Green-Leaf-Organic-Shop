import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminAuthGuardService } from '../admin/services/admin-auth-guard.service';
import { AdminViewOrderComponent } from './components/admin-view-order/admin-view-order.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatSliderModule, MatSortModule } from '@angular/material';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    CustomFormsModule,
    FormsModule,    
    NgbCollapseModule,
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,
    MatSortModule, 
    NgDynamicBreadcrumbModule,
    RouterModule.forChild([
      // BEGIN ROUTE
      {path: 'admin/orders/:id', component: AdminViewOrderComponent,
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
          },
          {
            label: 'View Order',
            url: 'admin/orders/:id'
          }
        ]
        // END BREADCRUMB DATA
      }, canActivate: [AuthGuardService,AdminAuthGuardService]},    
      // END ROUTE      
    ]),
  ],
  declarations: [
    ProductQuantityComponent,
    ProductCardComponent,
    AdminViewOrderComponent,
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    ProductService,    
    CategoryService,
    OrderService
  ],
  exports: [
    ProductQuantityComponent,
    ProductCardComponent,
    AdminViewOrderComponent,     
    CommonModule,
    FontAwesomeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    NgDynamicBreadcrumbModule,
    CustomFormsModule,
    FormsModule,    
    NgbCollapseModule, 
    CustomFormsModule,  
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,
    MatSortModule,         
  ],
})
export class SharedModule { }
