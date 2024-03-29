import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: unknown; 

  constructor(private db: AngularFireDatabase) {    
  }

  save(user: firebase.User){  // Saves username and email to our firebase db  
    this.db.object('/users/'+user.uid)
    .update({ 
      name: user.displayName,
      email: user.email,
      isAdmin: true // For Demonstration Purposes, all authenticated users have administrator privileges
    });
  }

  getUser(uid: string) : AngularFireObject<AppUser>
  {
    return this.db.object('/users/'+uid);
    
  }
  
 
}
