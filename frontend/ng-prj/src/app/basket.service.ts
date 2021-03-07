import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private readonly _basket: Array<number> = [];

  basket$: BehaviorSubject<any> = new BehaviorSubject([]);
  basketCount$: BehaviorSubject<any> = new BehaviorSubject(0);
  isSubmitted = false;

  // TODO прикрутить количество одинаковых товаров basketCount$

  constructor() {
    if (localStorage.getItem('basket')) {
      this._basket = JSON.parse(localStorage.getItem('basket') as string);
      this.basket$.next(this._basket);
    }
  }

  getBasket(): any {
    return this._basket;
  }

  addToBasket(id: any): void {
    this._basket.push(id);
    this.basket$.next(this._basket);
    this.setToLocalStorage(id);
    this.isSubmitted = false;
  }

  private setToLocalStorage(id: number): void {
    if (!id) {
      return;
    } else if (!localStorage.getItem('basket')) {
      localStorage.setItem('basket', JSON.stringify([id]));
    } else {
      localStorage.setItem('basket', JSON.stringify(this._basket));
      this.basket$.next(JSON.parse(localStorage.getItem('basket') as string));
    }
  }

  removeFromBasket(id?: any): void {
    if (!id) {
      this._basket.splice(0, this._basket.length);
    } else {
      const index = this._basket.findIndex(x => x.valueOf() === id);
      this._basket.splice(index, 1);
    }
    this.basket$.next(this._basket);
    this.removeFromLocalstorage(id);

  }

  private removeFromLocalstorage(id?: any): void {  // удаление продукта из корзины, либо очистка
    if (!id) {
      localStorage.removeItem('basket');
    } else {
      const basket = JSON.parse(localStorage.getItem('basket') as string);
      const index = basket.findIndex((x: number) => x === id);
      basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(basket));
    }
  }

  isInBasket(value: any): boolean {
    return this._basket.indexOf(value) > -1;
  }

}
