import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NumbersOnlyDirective } from './directives/numbers-only-directive';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { RouterModule } from '@angular/router';

import { MatSliderModule } from '@angular/material/slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart-service';
import { ProductQuantityComponent } from './products/product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { AdminViewOrderComponent } from './admin-view-order/admin-view-order.component';




@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductsFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    NumbersOnlyDirective,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    AdminViewOrderComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,  
    AngularFireModule.initializeApp(environment.firebase, 'oshop'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule, 
    MatTableModule,   
    MatSliderModule,
    CustomFormsModule,
    MatPaginatorModule,
    MatSortModule,
    FontAwesomeModule,
    NgbCollapseModule,
    NgDynamicBreadcrumbModule,
    RouterModule.forRoot([
      { 
        path: '', component: HomeComponent,
        data: {
          title: 'Home',
          breadcrumb: [
            {
              label: 'Home',
              url: ''
            }
          ]
        },
      },
        {path: 'products', component: ProductsComponent,
        data: {
          title: 'products',
          breadcrumb: [
            {
              label: 'Products',
              url: ''
            }
          ]
        },
      },
      { path: 'shopping-cart', component: ShoppingCartComponent,
        data: {
          title: 'shopping-cart',
          breadcrumb: [
            {
              label: 'Home',
              url: '/'
            },
            {
              label: 'Shopping-Cart',
              url: '/shopping-cart'
            }
          ]
        },
      },
      { path: 'login', component: LoginComponent,
        data: {
          title: 'login',
          breadcrumb: [
            {
              label: 'Home',
              url: '/'
            },
            {
              label: 'Login',
              url: '/login'
            }
          ]
        },
      },
      { path: 'check-out', component: CheckOutComponent,
        data: {
          title: 'check-out',
          breadcrumb: [
            {
              label: 'Home',
              url: '/'
            },
            {
              label: 'Shopping-Cart',
              url: '/shopping-cart'
            },
            {
              label: 'Check-out',
              url: '/check-out'
            }
          ]
        }, 
      canActivate: [AuthGuardService]},
      { path: 'order-success/:id', component: OrderSuccessComponent,
        data: {
          title: 'Order Success',
          breadcrumb: [
            {
              label: 'Home',
              url: '/'
            },
            {
              label: 'Shopping-Cart',
              url: '/shopping-cart'
            },
            {
              label: 'Check-out',
              url: '/check-out'
            },
            {
              label: 'Order Success',
              url: '/order-success/:id'
            }            
          ]
        }, canActivate: [AuthGuardService]}, 
      { path: 'my/orders/:id', component: AdminViewOrderComponent,      
        data: {
          title: 'My Orders',
          breadcrumb: [
            {
              label: 'Home',
              url: '/'
            },
            {
              label: 'My Orders',
              url: 'my/orders'
            },
            {
              label: 'View Order',
              url: 'my/orders/:id'
            }
          ]
        }, canActivate: [AuthGuardService]},
      {path: 'my/orders', component: MyOrdersComponent,      
      data: {
        title: 'My Orders',
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'My Orders',
            url: 'my/orders'
          }
        ]
      }, canActivate: [AuthGuardService]},
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
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
