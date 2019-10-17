import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth:AuthService, private router: Router, private userService: UserService) {
    auth.user$.subscribe(user=> {
      if (user) { 
        this.userService.save(user);
        
        let returnUrl = localStorage.getItem('returnUrl');        
        this.router.navigateByUrl(returnUrl);
      }
    })
  }
  
}