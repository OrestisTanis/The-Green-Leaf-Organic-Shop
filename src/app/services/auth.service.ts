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

  ngOnInit() {
  }

  loginGoogle(){
    this.saveCurrentUrl();
    let provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');
    this.afAuth.auth.signInWithRedirect(provider)  
  }

  loginFacebook(){
    this.saveCurrentUrl();
    let provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');
    this.afAuth.auth.signInWithPopup(provider)
  }
 
  logout() {
    localStorage.removeItem('returnUrl');
    
    // The following two statements have the same functionality
    //this.router.navigate(['/'], { relativeTo: this.route }); 
    this.router.navigateByUrl('/');
    
    this.afAuth.auth.signOut();
    
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

}
