import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { CustomFormsModule } from 'ng2-validation';
import { environment } from 'src/environments/environment';

import { AdminViewOrderComponent } from './admin-view-order/admin-view-order.component';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { NumbersOnlyDirective } from './directives/numbers-only-directive';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartService } from './services/shopping-cart-service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



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
    ProductsFilterComponent,    
    NumbersOnlyDirective,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    AdminViewOrderComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule, 
    SharedModule, 
    AdminModule,
    AngularFireModule.initializeApp(environment.firebase, 'oshop'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
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
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    AdminAuthGuardService,    
    ShoppingCartService
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
