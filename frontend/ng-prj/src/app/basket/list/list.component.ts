import {Component, OnDestroy, OnInit} from '@angular/core';

import {ApiService} from '../../api.service';
import {BasketService} from '../../basket.service';
import {LoginService} from '../../login.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

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
    private router: Router
  ) {
    this.loginService.isAuth$.subscribe((res: any) => {
      this.isAuth = res;
      if (this.isAuth) {
        this.apiService.init().subscribe((data: any) => {
          this.user = data.user;
        });
      }
    });
    this.apiService.getBasketInfo(this.basketService.getBasket()).subscribe((rez: any) => {
      if (rez.length === 0 && !this.isBasketSubmitted) {
        this.router.navigate(['/'], {replaceUrl: true}).then();
      } else {
        this.basket = rez;
        this.basketService.basket$.pipe(takeUntil(this.unsubscribe)).subscribe(data => {
          for (const product of this.basket) {
            product.amount = data.find((x: { product: any; }) => x.product === product.id).amount;
            product.price_multiple = product.get_price * product.amount;
          }
        });
      }
    });
  }

  faTrashAlt = faTrashAlt;
  basket: Array<any> = [];
  isAuth = false;
  user = {first_name: '', phone: '', address: ''};
  isBasketSubmitted = false;
  isBasketClearTry = false;
  private unsubscribe = new Subject();

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  askToClearBasket(): void {
    this.isBasketClearTry = true;
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

  getTotalPrice(): number {
    let result = 0;
    for (const product of this.basket) {
      result += product.price_multiple;
    }
    return result;
  }

  isProfileFilled(): boolean {
    return !!(this.user.first_name && this.user.phone && this.user.address);
  }

  submitBasket(): void {
    const reqData = {products: Array<object>()};
    for (const p of this.basket) {
      reqData.products.push({product: p.id, amount: p.amount});
    }
    this.apiService.submitBasket(reqData).subscribe(() => {
      this.clearBasket();
      this.isBasketSubmitted = this.basketService.isSubmitted = true;
    });
  }

  onPlus(product: any): void {
    product.amount += 1;
    this.basketService.addToBasket(product.id, product.amount);
  }

  onMinus(product: any): void {
    if (product.amount > 1) {
      product.amount -= 1;
    }
    this.basketService.addToBasket(product.id, product.amount);
  }

  onWheel(product: any, event: WheelEvent): void {
    event.preventDefault();
    if (event.deltaY > 0) {
      if (product.amount > 1) {
        product.amount -= 1;
      }
    } else {
      product.amount += 1;
    }
    this.basketService.addToBasket(product.id, product.amount);
  }
}
