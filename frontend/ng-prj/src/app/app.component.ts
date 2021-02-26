import {Component} from '@angular/core';
import {ApiService} from './api.service';
import {BasketService} from './basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  categories: Array<any> = [];
  basket: Array<any> = [];

  constructor(
    private apiService: ApiService,
    private basketService: BasketService
    ) {
    this.apiService.getCategoryList().subscribe((res: any) => {
      this.categories = res;
    });

    this.basketService.basket$.subscribe((data: any) => {
        this.basket = data;
      }
    );
  }
}
