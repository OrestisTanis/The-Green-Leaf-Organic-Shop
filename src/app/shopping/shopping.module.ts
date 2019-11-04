import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    MyOrdersComponent, 
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ProductsFilterComponent, 
  ],
  providers: [
    AuthGuardService
  ],
  exports: [
    ProductsComponent,     
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CustomFormsModule,
    FontAwesomeModule,
    RouterModule.forChild([      
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
    ]),
  ]
})
export class ShoppingModule { }