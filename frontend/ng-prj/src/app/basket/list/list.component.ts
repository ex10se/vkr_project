import {Component, OnDestroy, OnInit} from '@angular/core';

import {ApiService} from '../../api.service';
import {BasketService} from '../../basket.service';
import {LoginService} from '../../login.service';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(
    private apiService: ApiService,
    private basketService: BasketService,
    private loginService: LoginService,
    private authService: SocialAuthService,
    private router: Router,
  ) {
    this.apiService.getBasketInfo(this.basketService.getBasket()).subscribe((rez: any) => {
      if (rez.length === 0 && !this.isBasketSubmitted) {
        this.router.navigate(['/'], {replaceUrl: true}).then();
      } else {
        this.basket = rez;
      }
    });
    this.loginService.isAuth$.subscribe(data => {
      this.isAuth = data;
    });
  }

  basket: Array<any> = [];
  isAuth = false;
  private unsubscribe = new Subject();
  isBasketSubmitted = false;

  ngOnInit(): void {
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.authService.authState.subscribe(user => {
        this.apiService.loginByGoogle(user).subscribe((rez) => {
          this.loginService.login(rez);
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  clearBasket(): void {
    this.basket.splice(0, this.basket.length);
    this.basketService.removeFromBasket();
  }

  delFromBasket(id: number): void {
    const index = this.basket.findIndex(x => x.id.valueOf() === id);
    this.basket.splice(index, 1);
    this.basketService.removeFromBasket(id);
  }

  submitBasket(): void {
    const reqData = {products: Array<object>()};
    for (const p of this.basket) {
      reqData.products.push({product: p.id, amount: 1});
    }
    this.apiService.submitBasket(reqData).subscribe(() => {
      this.clearBasket();
      this.isBasketSubmitted = this.basketService.isSubmitted = true;
    });
  }
}
