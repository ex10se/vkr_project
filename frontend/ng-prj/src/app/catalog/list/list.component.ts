import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {BasketService} from '../../basket.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ViewportScroller} from '@angular/common';
import {LoginService} from '../../login.service';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';


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
        this.param = params.SubcatId;
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
    });

  }

  faCartPlus = faCartPlus;
  isAuth = false;
  user = 0;
  pageYoffset = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  products: Array<any> = [];
  productsCount?: number;
  limit = 50;
  offset = 0;
  pageEvent: any;
  lowValue = 0;
  highValue = 50;
  currentState = '';
  param = '';
  userRatings: any;

  @HostListener('window:scroll', ['$event']) onScroll(event: PageEvent): void {
    this.pageYoffset = window.pageYOffset;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(
      (event: any) => {
        if (this.currentState === 'cat') {
          this.doGetProductList({cat: this.param}, event.pageSize, this.lowValue);
        } else if (this.currentState === 'subcat') {
          this.doGetProductList({subcat: this.param}, event.pageSize, this.lowValue);
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
        console.log(this.products);
        this.productsCount = res.count;
      } else {
        this.router.navigate(['/'], {replaceUrl: true}).then();
      }
    });
  }

  doSetProductRating(user: number, product: number, rating: number): void {
    this.apiService.setProductRating(user, product, rating).subscribe(() => {
    });
  }

  doAddToBasket(id: number, amount: any): void {
    this.basketService.addToBasket(id, amount);
  }

  scrollToTop(): void {
    this.scroll.scrollToPosition([0, 0]);
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
  }

}
