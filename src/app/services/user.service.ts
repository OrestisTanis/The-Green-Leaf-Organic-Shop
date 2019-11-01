import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: unknown;

  //users: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {    
  }

  save(user: firebase.User){  //Saves username and email to our firebase db  
    this.db.object('/users/'+user.uid)
    .update({ 
      name: user.displayName,
      email: user.email
    });
  }

  getUser(uid: string) : AngularFireObject<AppUser>
  {
    return this.db.object('/users/'+uid);
    
  }
  
 
}
