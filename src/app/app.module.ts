import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

import { AdminModule } from './admin/admin.module';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { NumbersOnlyDirective } from './directives/numbers-only-directive';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartService } from './services/shopping-cart-service';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';





@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,    
    LoginComponent,
       
       
    NumbersOnlyDirective,
    
    
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule, 
    SharedModule, 
    AdminModule,
    ShoppingModule,
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
    AdminAuthGuardService,    
    ShoppingCartService
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
