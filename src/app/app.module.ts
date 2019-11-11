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
    RouterModule.forRoot([
      { 
        path: '', component: ProductsComponent,
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
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    ShoppingCartService
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
