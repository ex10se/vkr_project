import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';

import {ApiService} from '../../api.service';
import {BasketService} from '../../basket.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private apiService: ApiService,
    private basketService: BasketService,
  ) {
  }

  basket: Array<number> = [];
  basketInfo: Array<any> = [];
  private unsubscribe = new Subject();

  ngOnInit(): void {
    this.getBasketList();
    this.getBasketInfo();
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getBasketList(): void {
    this.basketService.basket$.pipe(takeUntil(this.unsubscribe)).subscribe(
      data => this.basket = data
    );
  }

  getBasketInfo(): void {
    this.apiService.getBasketInfo(this.basketService.fillBasket()).subscribe((rez: any) => {
      this.basketInfo = rez;
    });
  }

  clearBasket(): void {
    this.basket.splice(0, this.basket.length);
    this.basketService.removeAllFromLocalstorage();
    // this.ngOnInit();
  }

  deleteBasketItem(id: number): void {
    const index = this.basket.findIndex(x => x.valueOf() === id);
    this.basket.splice(index, 1);
    this.basketService.removeFromLocalstorage(id);
    this.ngOnChanges();
  }
}
