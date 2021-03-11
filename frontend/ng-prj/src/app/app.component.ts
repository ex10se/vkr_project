import {Component} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

import {ApiService} from './api.service';
import {BasketService} from './basket.service';
import {LoginService} from './login.service';

import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {faBars} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faGoogle = faGoogle;
  faBars = faBars;

  categories: Array<any> = [];
  basket: Array<any> = [];
  user: SocialUser | undefined;
  isAuth = false;

  constructor(
    private apiService: ApiService,
    private basketService: BasketService,
    private authService: SocialAuthService,
    private loginService: LoginService
  ) {
    this.basketService.basket$.pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.basket = data;
    });

    this.apiService.init().subscribe((data: any) => {
      this.loginService.login({token: data.token});
    }, (err: any) => {
      this.loginService.logout();
    });

    this.loginService.isAuth$.subscribe((data: any) => {
      this.isAuth = data;
    });

    this.authService.authState.subscribe(user => {
      this.user = user;
    });

    this.apiService.getCategoryList().subscribe((res: any) => {
      this.categories = res;
    });
  }

  private unsubscribe = new Subject();

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      this.authService.authState.subscribe(user => {
        this.apiService.loginByGoogle(user).subscribe((rez: any) => {
          this.loginService.login(rez);
        });
      });
    });
  }

  signOut(): void {
    this.loginService.logout();
  }

}
