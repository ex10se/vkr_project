import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private _basket: Array<number> = [];

  basket$: BehaviorSubject<any> = new BehaviorSubject([]);
  basketCount$: BehaviorSubject<any> = new BehaviorSubject(0);

  // TODO прикрутить количество одинаковых товаров basketCount$

  constructor() {
    this.fillBasket();
  }

  fillBasket(): any {
    if (!localStorage.getItem('basket')) {
      return;
    }
    this._basket = JSON.parse(localStorage.getItem('basket') as string);
    this.basket$.next(this._basket);
    return this._basket;
  }

  addToBasket(id: number): void {
    this._basket.push(id);
    this.basket$.next(this._basket);
    this.setToLocalStorage(id);
  }

  private setToLocalStorage(id?: number): void {
    if (!localStorage.getItem('basket')) {
      localStorage.setItem('basket', JSON.stringify([]));
    } else {
      localStorage.setItem('basket', JSON.stringify(this._basket));
      this.basket$.next(JSON.parse(localStorage.getItem('basket') as string));
    }
    if (!id) {
      return;
    }
  }

  removeFromLocalstorage(id: any): void {  // удаление продукта из корзины
    this._basket.splice(id, 1);
    const basket = JSON.parse(localStorage.getItem('basket') as string);
    const index = basket.findIndex((x: any) => x.id === id);
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  removeAllFromLocalstorage(): void {  // очистка корзины
    this._basket.splice(0, this._basket.length);
    const basket = JSON.parse(localStorage.getItem('basket') as string);
    basket.splice(0, basket.length);
    localStorage.setItem('basket', JSON.stringify([]));
  }

  // старые и наверно не нужные
  isInBasket(value: any): boolean {
    return this._basket.indexOf(value) > -1;
  }

}
