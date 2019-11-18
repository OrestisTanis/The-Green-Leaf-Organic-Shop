
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

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
    FooterComponent,
    LogoutModalComponent,
    PrivacyPolicyComponent
  ],
  exports:[
    BsNavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
