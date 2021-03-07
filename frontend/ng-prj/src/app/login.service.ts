import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  storage: any;
  isAuth$ = new BehaviorSubject(false);
  // user$ = new BehaviorSubject(false);

  constructor() {
    this.storage = localStorage;
  }

  getToken(): string {
    return this.storage.getItem('access_token');
  }

  setToken(value: string): void {
    this.storage.setItem('access_token', value);
  }

  login(user: any): void {
    this.setToken(user.token);
    this.isAuth$.next(true);
    // this.user$.next(user.user);
    // console.log(user);
  }

  logout(): void {
    this.isAuth$.next(false);
    this.storage.removeItem('access_token');
    // this.user$.next(false);
  }

}
