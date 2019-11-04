import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forChild([])
  ],
  declarations: [ 
    BsNavbarComponent,
    HomeComponent,    
    LoginComponent,
    BreadcrumbComponent
  ],
  exports:[
    BsNavbarComponent
  ]
})
export class CoreModule { }
