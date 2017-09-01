import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class DatabaseService {

  userId: string;
  users: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getUserList(): FirebaseListObservable<any[]> {
    this.users = this.db.list(`/users`);
    return this.users;
  }

  getUser(uid: string): FirebaseObjectObservable<any> {
    this.user = this.db.object(`/users/${uid}`);
    return this.user;
  }

  setUser(uid: string, user: object) {
    this.db.object(`/users/${uid}`).set(user);
  }

  updateUser(uid: string, user: object) {
    this.db.object(`/users/${uid}`).update(user);
  }

  removeUser(uid: string) {
    this.db.object(`/users/${uid}`).remove();
  }

  // createUser(user: Object, path?: string) {
  //   if (path) {
  //     this.db
  //       .object(`${path}`)
  //       .set(user)
  //       .catch(error => (console.log(error)));;
  //   }
  //   if (!this.path) {
  //     throw new Error('Service default path not set');
  //   }
  //   this.db
  //     .object(`${this._path}`)
  //     .set(user)
  //     .catch(error => (console.log(error)));;
  // }
  //
  // updateUser(user: Object, path?: string) {
  //   if (path) {
  //     this.db
  //       .object(`${path}`)
  //       .update(user)
  //       .catch(error => (console.log(error)));
  //   }
  //   if (!this.path) {
  //     throw new Error('Service default path not set');
  //   }
  //   this.db
  //     .object(`${this._path}`)
  //     .update(user)
  //     .catch(error => (console.log(error)));
  // }
  //
  // deleteUser(path: string) {
  //   if (path) {
  //     this.db
  //       .object(`${path}`)
  //       .remove(user);
  //   }
  //   if (!this.path) {
  //     throw new Error('Service default path not set');
  //   }
  //   this.user = this.db.object(`${this._path}`);
  //   return this.user;
  // }
}
