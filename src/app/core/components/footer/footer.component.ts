import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { AppUser } from 'src/app/shared/models/app-user';

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

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  logOut(){
    this.router.navigate(['/']);  
    this.authService.logout();      
  }

  scrollToTop() {    
    let body = document.body; // Safari
    let html = document.documentElement; // Chrome, Firefox, IE and Opera places the overflow at the <html> level, unless else is specified. Therefore, we use the documentElement property for these browsers

    body.scrollTop -= 10000;
    html.scrollTop -= 10000;
  }
}
