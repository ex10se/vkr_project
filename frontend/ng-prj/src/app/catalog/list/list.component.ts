import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../api.service';
import {BasketService} from '../../basket.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: any;


  constructor(private http: HttpClient,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private basketService: BasketService) {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('catId')) {
        this.getProductList({cat: params.catId});
      } else if (params.hasOwnProperty('SubCatId')) {
        this.getProductList({subcat: params.SubCatId});
      } else {
        this.getProductList({});
      }

    });
  }

  ngOnInit(): void {
  }

  getProductList(pars: any): void {
    this.apiService.getProductList(pars).subscribe((res: any) => {
      this.products = res.results;
    });
  }

  doAddToBasket(id: number): void {
    this.basketService.addToBasket(id);
  }
}
