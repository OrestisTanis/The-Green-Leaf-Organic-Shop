import { UserService } from './user.service';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>
  

  constructor(private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {  
              
      this.user$ = this.afAuth.authState;
  }

  loginGoogle(){
    this.saveCurrentUrl();
    let provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider)  
  }

  loginFacebook(){
    this.saveCurrentUrl();
    let provider = new firebase.auth.FacebookAuthProvider();    
    this.afAuth.auth.signInWithRedirect(provider)
  }
 
  logout() {
    localStorage.removeItem('returnUrl');  
    this.router.navigateByUrl('/');
    this.afAuth.auth.signOut();
    this.scrollToTop();
  }

  saveCurrentUrl(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.getUser(user.uid).valueChanges();
        else {
          return of(null);
        }
      })
    )
  }   
  
  scrollToTop() {    
    let body = document.body; // Safari
    let html = document.documentElement; // Chrome, Firefox, IE and Opera places the overflow at the <html> level, unless else is specified. Therefore, we use the documentElement property for these browsers

    body.scrollTop -= 10000;
    html.scrollTop -= 10000;
  }

}
