import { AdminViewOrderComponent } from './../shared/components/admin-view-order/admin-view-order.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';
import { SharedModule } from './../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

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
    SharedModule, 
    // ROUTES
    RouterModule.forChild([   
        // BEGIN ROUTE   
        {path: 'products', component: ProductsComponent,
        data: {
          title: 'products',
          // BEGIN BREADCRUMB DATA
          breadcrumb: [
            {
              label: 'Products',
              url: ''
            }
          ]
          // END BREADCRUMB DATA
        },
      },
      // END ROUTE

      // BEGIN ROUTE
      { path: 'shopping-cart', component: ShoppingCartComponent,
        data: {
          title: 'shopping-cart',
          // BEGIN BREADCRUMB DATA
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
          // END BREADCRUMB DATA
        },
      },  
      // END ROUTE

      // BEGIN ROUTE     
      { path: 'check-out', component: CheckOutComponent,
        data: {
          title: 'check-out',
          // BEGIN BREADCRUMB DATA
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
          // END BREADCRUMB DATA
        }, 
      canActivate: [AuthGuardService]},
      // END ROUTE

      // BEGIN ROUTE 
      { path: 'order-success/:id', component: OrderSuccessComponent,
        data: {
          title: 'Order Success',
          // BEGIN BREADCRUMB DATA
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
          // END BREADCRUMB DATA
        }, canActivate: [AuthGuardService]},     
        // END ROUTE

        // BEGIN ROUTE  
        {path: 'my/orders/:id', component: AdminViewOrderComponent,      
      data: {
        title: 'My Orders',
        // BEGIN BREADCRUMB DATA
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
        // END BREADCRUMB DATA
      }, canActivate: [AuthGuardService]},     
      // END ROUTE

      // BEGIN ROUTE    
      {path: 'my/orders', component: MyOrdersComponent,      
      data: {
        title: 'My Orders',
        // BEGIN BREADCRUMB DATA
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
        // END BREADCRUMB DATA
      }, canActivate: [AuthGuardService]},
      // END ROUTE
    ]),
  ]
})
export class ShoppingModule { }
