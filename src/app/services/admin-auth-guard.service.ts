import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map,switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { 

  }

  canActivate(route, state: RouterStateSnapshot) : Observable<boolean>{
    return this.auth.appUser$.pipe(
      map(AppUser => AppUser.isAdmin)
    );
  }
}
