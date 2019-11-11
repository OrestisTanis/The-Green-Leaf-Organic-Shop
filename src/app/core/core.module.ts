import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [ 
    BsNavbarComponent,
    HomeComponent,    
    LoginComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
  exports:[
    BsNavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
