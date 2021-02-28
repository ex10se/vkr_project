import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {BasketService} from './basket.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {LoginService} from './login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories: Array<any> = [];
  basket: Array<any> = [];
  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;
  isAuth = false;

  constructor(
    private apiService: ApiService,
    private basketService: BasketService,
    private authService: SocialAuthService,
    private loginService: LoginService,
  ) {
    this.apiService.getCategoryList().subscribe((res: any) => {
      this.categories = res;
    });

    this.basketService.basket$.pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
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
  }

  private unsubscribe = new Subject();


  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
    console.log('USER: ' + this.user);
  }

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
    this.authService.signOut();
    this.loginService.logout();
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
