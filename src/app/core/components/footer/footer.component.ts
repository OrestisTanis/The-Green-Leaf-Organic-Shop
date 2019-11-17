import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';

import { Component } from '@angular/core';
import { AppUser } from 'src/app/shared/models/app-user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  appUser: AppUser;
  
  
  constructor(private authService : AuthService,
    private router:Router,
    private modalService: NgbModal) { 
    authService.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      console.log(this.appUser);
    })
  }

  openLogoutModal(content) {
    this.modalService.open(content, { centered: true });    
  }

  
}
