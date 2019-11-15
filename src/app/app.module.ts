import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { NumbersOnlyDirective } from './directives/numbers-only-directive';
import { ShoppingCartService } from './services/shopping-cart-service';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    NumbersOnlyDirective,
  ],
  imports: [
    BrowserModule, 
    SharedModule, 
    ShoppingModule,
    AdminModule,
    CoreModule,    
    AngularFireModule.initializeApp(environment.firebase, 'oshop'),   
    // ROUTES
    RouterModule.forRoot([
      //BEGIN ROUTE
      { 
        path: '', component: ProductsComponent,
        data: {
          title: 'Home',
          // BEGIN BREADCRUMB DATA
          breadcrumb: [
            {
              label: 'Home',
              url: ''
            }
          ]
          // END BREADCRUMB DATA
        },
      },  
      //END ROUTE 

      //BEGIN ROUTE    
      { path: 'login', component: LoginComponent,
        data: {
          title: 'login',
          // BEGIN BREADCRUMB DATA
          breadcrumb: [
            {
              label: 'Home',
              url: '/'
            },
            {
              label: 'Sign In',
              url: '/login'
            }
          ]
          // END BREADCRUMB DATA
        },
      }, 
      //END ROUTE          
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    ShoppingCartService
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
