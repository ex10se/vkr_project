import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private _basket: Array<number> = [];

  basket$: BehaviorSubject<any> = new BehaviorSubject([]);


  constructor() {
  }

  addToBasket(id: number): any {
    if (!this.isInBasket(id)) {
      this._basket.push(id);
    }
    this.basket$.next(this._basket);
  }

  getBasket(): any {
    return this._basket;
  }

  isInBasket(value: any): boolean {
    return this._basket.indexOf(value) > -1;
  }

  delFromBasket(id: number): void {
    // delete this._basket[id];  // TODO: починить удаление
    // delete this.basket$[id];  // TODO: сохранение состояние корзины
    // this._basket.remove(id);
    this._basket = this._basket.filter((i: number) => i !== id);
  }

  submitBasket(): any {

  }

}
