import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { CustomFormsModule } from 'ng2-validation';
import { environment } from 'src/environments/environment';

import { AdminModule } from './admin/admin.module';
// import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';

import { NumbersOnlyDirective } from './directives/numbers-only-directive';
import { ShoppingCartService } from './services/shopping-cart-service';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { ProductsComponent } from './shopping/components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    NumbersOnlyDirective
  ],
  imports: [
    BrowserModule, 
    SharedModule, 
    ShoppingModule,
    AdminModule,
    CoreModule,    
    AngularFireModule.initializeApp(environment.firebase, 'oshop'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    CustomFormsModule,
    // FormsModule,
    // FontAwesomeModule,
    // NgbCollapseModule,
    // NgDynamicBreadcrumbModule,
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
