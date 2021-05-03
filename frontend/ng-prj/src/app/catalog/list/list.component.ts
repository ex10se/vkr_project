import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {BasketService} from '../../basket.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ViewportScroller} from '@angular/common';
import {LoginService} from '../../login.service';
import {faCartArrowDown, faCartPlus, faTimes} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private basketService: BasketService,
              private router: Router,
              private scroll: ViewportScroller,
              private loginService: LoginService) {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('catId')) {
        this.doGetProductList({cat: params.catId}, this.limit, this.offset);
        this.currentState = 'cat';
        this.param = params.catId;
      } else if (params.hasOwnProperty('SubCatId')) {
        this.doGetProductList({subcat: params.SubCatId}, this.limit, this.offset);
        this.currentState = 'subcat';
        this.param = params.SubCatId;
      } else if (params.hasOwnProperty('popular')) {
        this.doGetPopularProductList(this.limit, this.offset);
        this.currentState = 'popular';
        this.param = '';
      } else {
        this.doGetProductList({}, this.limit, this.offset);
        this.currentState = 'all';
        this.param = '';
      }
    });
    this.loginService.isAuth$.subscribe((data: any) => {
      this.isAuth = data;
    });
    this.apiService.init().subscribe((data: any) => {
      this.user = data.user.id;
      this.apiService.getUserRatings(this.user).subscribe((res: any) => {
        this.userRatings = res;
      });
      this.apiService.getOrderList(this.user).subscribe((rez: any) => {
        this.orders = rez;
      });
    });
    this.basketService.basket$.subscribe(data => {
      this.basket = data;
    });
    this.apiService.getPredictions().subscribe((res: any) => {
      this.predictedProducts = res.results;
      console.log(this.predictedProducts);
    });
  }

  loading = true;
  faCartPlus = faCartPlus;
  faCartArrowDown = faCartArrowDown;
  isAuth = false;
  user = 0;
  pageYoffset = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  pageEvent?: PageEvent;
  products: Array<any> = [];
  predictedProducts: Array<any> = [];
  productsCount?: number;
  limit = 24;
  offset = 0;
  lowValue = 0;
  highValue = 24;
  currentState = '';
  param = '';
  userRatings: any;
  orders: any;
  basket: any;
  rating = 0;
  searchValue = '';
  faTimes = faTimes;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event: any) => {
        this.loading = true;
        if (this.searchValue) {
          this.doSearch(this.searchValue, event.pageSize, this.lowValue);
        } else if (this.currentState === 'cat') {
          this.doGetProductList({cat: this.param}, event.pageSize, this.lowValue);
        } else if (this.currentState === 'subcat') {
          this.doGetProductList({subcat: this.param}, event.pageSize, this.lowValue);
        } else if (this.currentState === 'popular') {
          this.doGetPopularProductList(event.pageSize, this.lowValue);
        } else {
          this.doGetProductList({}, event.pageSize, this.lowValue);
        }
      }
    );
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  doGetProductList(pars: any, limit: number, offset: number): void {
    this.apiService.getProductList(pars, limit, offset).subscribe((res: any) => {
      if (res.results.length > 0) {
        this.products = res.results;
        for (const product of this.products) {
          product.amount = 1;
        }
        this.productsCount = res.count;
      } else {
        this.router.navigate(['/'], {replaceUrl: true}).then();
      }
      this.loading = false;
    });
  }

  doGetPopularProductList(limit: number, offset: number): void {
    this.apiService.getPopularProductList(limit, offset).subscribe((res: any) => {
      this.products = res.results;
      for (const product of this.products) {
        product.amount = 1;
      }
      this.productsCount = res.count;
      this.loading = false;
    });
  }

  productUserRating(product: number): number {
    try {
      this.rating = this.userRatings.find((p: any) => p.product_id === product).rating;
    } catch (TypeError) {
      this.rating = 0;
    }
    return this.rating;
  }

  doSetProductRating(user: number, product: number, rating: number): void {
    this.apiService.setProductRating(user, product, rating).subscribe(() => {
      this.rating = rating;
    });
  }

  hasProductBeenBought(product: number): boolean {
    try {
      return !!this.orders.find((o: any) => o.products.find((p: any) => p.product.id === product));
    } catch (TypeError) {
      return false;
    }
  }

  isInBasket(product: number): boolean {
    return this.basket.length > 0 ? this.basketService.isInBasket(product) : false;
  }

  doAddToBasket(id: number, amount: any): void {
    this.basketService.addToBasket(id, amount);
  }

  scrollToTop(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  @HostListener('window:scroll', ['$event']) onScroll(): void {
    this.pageYoffset = window.pageYOffset;
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
  }

  resetSearchValue(): void {
    this.searchValue = '';
    this.doGetProductList({}, this.limit, this.offset);
  }

  doSearch(query: string, limit: number, offset: number): void {
    if (query) {
      this.apiService.doSearchProduct(query, limit, offset).subscribe((res: any) => {
        this.products = res.results;
        for (const product of this.products) {
          product.amount = 1;
        }
        this.productsCount = res.count;
        this.loading = false;
      });
    }
  }
}
