import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private readonly _basket: Array<any> = [];

  basket$: BehaviorSubject<any> = new BehaviorSubject([]);
  isSubmitted = false;


  constructor() {
    if (localStorage.getItem('basket')) {
      this._basket = JSON.parse(localStorage.getItem('basket') as string);
      this.basket$.next(this._basket);
    }
  }

  getBasket(): Array<object> {
    return this._basket;
  }

  addToBasket(product: number, amount: number): void {
    try {  // если есть продукт, изменяем его количество
      this._basket.find(x => x[`product`] === product).amount = amount;
    } catch (TypeError) {  // если нет продукта, добавляем
      this._basket.push({product, amount});
    }
    this.basket$.next(this._basket);
    this.setToLocalStorage(product, amount);
    this.isSubmitted = false;
  }

  private setToLocalStorage(product: number, amount: number): void {
    if (!product) {
      return;
    } else if (!localStorage.getItem('basket')) {
      localStorage.setItem('basket', JSON.stringify({product, amount}));
    } else {
      localStorage.setItem('basket', JSON.stringify(this._basket));
      this.basket$.next(JSON.parse(localStorage.getItem('basket') as string));
    }
  }

  removeFromBasket(product?: any): void {
    if (!product) {
      this._basket.splice(0, this._basket.length);
    } else {
      const index = this._basket.findIndex(x => x.valueOf() === product);
      this._basket.splice(index, 1);
    }
    this.basket$.next(this._basket);
    this.removeFromLocalstorage(product);
  }

  private removeFromLocalstorage(product?: any): void {  // удаление продукта из корзины, либо очистка
    if (!product) {
      localStorage.removeItem('basket');
    } else {
      const basket = JSON.parse(localStorage.getItem('basket') as string);
      const index = basket.findIndex((x: number) => x === product);
      basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(basket));
    }
  }

  isInBasket(product: any): boolean {
    return this._basket.indexOf(product) > -1;
  }

}
