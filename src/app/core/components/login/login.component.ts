import { AuthService } from '../../../shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

  loginGoogle(){
    this.auth.loginGoogle();
  }

  loginFacebook(){
   this.auth.loginFacebook();
  }
 
}
