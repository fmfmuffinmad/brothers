import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {DatabaseService} from './database.service';

@Injectable()
export class AuthService implements OnInit {

  user: Observable<firebase.User>;
  userInstance: any;

  constructor(private afAuth: AngularFireAuth,
              private db: DatabaseService) {
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      this.userInstance = user;
    });
  }

  ngOnInit(): void {
    this.db.getUserList();
  }

  signin(provider: string) {
    switch (provider) {
      case 'google':
        this.afAuth.auth
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then( data => {
            this.db.setUser(data.user.uid, {lastLogin: Date.now()});

          });
        break;
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
