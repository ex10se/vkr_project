(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\ex10se\PycharmProjects\vkr_project\frontend\ng-prj\src\main.ts */"zUnb");


/***/ }),

/***/ "3IFh":
/*!*********************************************!*\
  !*** ./src/app/auth-interceptor.service.ts ***!
  \*********************************************/
/*! exports provided: AuthInterceptorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptorService", function() { return AuthInterceptorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.service */ "edGd");



let AuthInterceptorService = class AuthInterceptorService {
    constructor(loginService) {
        this.loginService = loginService;
    }
    intercept(req, next) {
        const idToken = this.loginService.getToken();
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Token ' + idToken)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req.clone());
        }
    }
};
AuthInterceptorService.ctorParameters = () => [
    { type: _login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"] }
];
AuthInterceptorService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], AuthInterceptorService);



/***/ }),

/***/ "6J3s":
/*!*******************************************!*\
  !*** ./src/app/catalog/catalog.module.ts ***!
  \*******************************************/
/*! exports provided: CatalogModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CatalogModule", function() { return CatalogModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list/list.component */ "RPZo");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "6NWb");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _crystalui_angular_lightbox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @crystalui/angular-lightbox */ "k/Yu");

















const routes = [
    { path: '', component: _list_list_component__WEBPACK_IMPORTED_MODULE_3__["ListComponent"] },
    { path: 'cat/:catId', component: _list_list_component__WEBPACK_IMPORTED_MODULE_3__["ListComponent"] },
    { path: 'subcat/:SubCatId', component: _list_list_component__WEBPACK_IMPORTED_MODULE_3__["ListComponent"] },
];
let CatalogModule = class CatalogModule {
};
CatalogModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_list_list_component__WEBPACK_IMPORTED_MODULE_3__["ListComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_8__["MatCardModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__["MatPaginatorModule"],
            _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__["MatBadgeModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__["NgbRatingModule"],
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_14__["FontAwesomeModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__["MatButtonToggleModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__["MatProgressSpinnerModule"],
            _crystalui_angular_lightbox__WEBPACK_IMPORTED_MODULE_16__["CrystalLightboxModule"],
        ],
        exports: [
            _list_list_component__WEBPACK_IMPORTED_MODULE_3__["ListComponent"]
        ],
        providers: [
            _api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"],
        ]
    })
], CatalogModule);



/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    backendUrl: 'http://localhost:8000/',
    socketUrl: 'ws://localhost:8000',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "ECui":
/*!***********************************!*\
  !*** ./src/app/basket.service.ts ***!
  \***********************************/
/*! exports provided: BasketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasketService", function() { return BasketService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");



let BasketService = class BasketService {
    constructor() {
        this._basket = [];
        this.basket$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this.isSubmitted = false;
        if (localStorage.getItem('basket')) {
            this._basket = JSON.parse(localStorage.getItem('basket'));
            this.basket$.next(this._basket);
        }
    }
    getBasket() {
        return this._basket;
    }
    addToBasket(product, amount) {
        try { // если есть продукт, изменяем его количество
            this._basket.find(x => x[`product`] === product).amount = amount;
        }
        catch (TypeError) { // если нет продукта, добавляем
            this._basket.push({ product, amount });
        }
        this.basket$.next(this._basket);
        this.setToLocalStorage(product, amount);
        this.isSubmitted = false;
    }
    setToLocalStorage(product, amount) {
        localStorage.setItem('basket', JSON.stringify(this._basket));
        this.basket$.next(JSON.parse(localStorage.getItem('basket')));
    }
    removeFromBasket(product) {
        if (!product) {
            this._basket.splice(0, this._basket.length);
        }
        else {
            const index = this._basket.findIndex(x => x.valueOf() === product);
            this._basket.splice(index, 1);
        }
        this.basket$.next(this._basket);
        this.removeFromLocalstorage(product);
    }
    removeFromLocalstorage(product) {
        if (!product) {
            localStorage.removeItem('basket');
        }
        else {
            const basket = JSON.parse(localStorage.getItem('basket'));
            const index = basket.findIndex((x) => x === product);
            basket.splice(index, 1);
            localStorage.setItem('basket', JSON.stringify(basket));
        }
    }
    isInBasket(product) {
        return this._basket.findIndex((p) => p.product === product) > -1;
    }
};
BasketService.ctorParameters = () => [];
BasketService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], BasketService);



/***/ }),

/***/ "RPZo":
/*!************************************************!*\
  !*** ./src/app/catalog/list/list.component.ts ***!
  \************************************************/
/*! exports provided: ListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListComponent", function() { return ListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_list_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./list.component.html */ "wFaY");
/* harmony import */ var _list_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list.component.scss */ "gEhI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../api.service */ "yTNM");
/* harmony import */ var _basket_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../basket.service */ "ECui");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../login.service */ "edGd");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");












let ListComponent = class ListComponent {
    constructor(http, apiService, route, basketService, router, scroll, loginService) {
        this.http = http;
        this.apiService = apiService;
        this.route = route;
        this.basketService = basketService;
        this.router = router;
        this.scroll = scroll;
        this.loginService = loginService;
        this.loading = true;
        this.faCartPlus = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__["faCartPlus"];
        this.faCartArrowDown = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__["faCartArrowDown"];
        this.isAuth = false;
        this.user = 0;
        this.pageYoffset = 0;
        this.products = [];
        this.limit = 24;
        this.offset = 0;
        this.lowValue = 0;
        this.highValue = 24;
        this.currentState = '';
        this.param = '';
        this.rating = 0;
        this.route.params.subscribe(params => {
            if (params.hasOwnProperty('catId')) {
                this.doGetProductList({ cat: params.catId }, this.limit, this.offset);
                this.currentState = 'cat';
                this.param = params.catId;
            }
            else if (params.hasOwnProperty('SubCatId')) {
                this.doGetProductList({ subcat: params.SubCatId }, this.limit, this.offset);
                this.currentState = 'subcat';
                this.param = params.SubCatId;
            }
            else {
                this.doGetProductList({}, this.limit, this.offset);
                this.currentState = 'all';
                this.param = '';
            }
        });
        this.loginService.isAuth$.subscribe((data) => {
            this.isAuth = data;
        });
        this.apiService.init().subscribe((data) => {
            this.user = data.user.id;
            this.apiService.getUserRatings(this.user).subscribe((res) => {
                this.userRatings = res;
            });
            this.apiService.getOrderList(this.user).subscribe((rez) => {
                this.orders = rez;
            });
        });
        this.basketService.basket$.subscribe(data => {
            this.basket = data;
        });
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.paginator.page.subscribe((event) => {
            this.loading = true;
            if (this.currentState === 'cat') {
                this.doGetProductList({ cat: this.param }, event.pageSize, this.lowValue);
            }
            else if (this.currentState === 'subcat') {
                this.doGetProductList({ subcat: this.param }, event.pageSize, this.lowValue);
            }
            else {
                this.doGetProductList({}, event.pageSize, this.lowValue);
            }
        });
    }
    getPaginatorData(event) {
        this.lowValue = event.pageIndex * event.pageSize;
        this.highValue = this.lowValue + event.pageSize;
        return event;
    }
    doGetProductList(pars, limit, offset) {
        this.apiService.getProductList(pars, limit, offset).subscribe((res) => {
            if (res.results.length > 0) {
                this.products = res.results;
                for (const product of this.products) {
                    product.amount = 1;
                }
                this.productsCount = res.count;
            }
            else {
                this.router.navigate(['/'], { replaceUrl: true }).then();
            }
            this.loading = false;
        });
    }
    productUserRating(product) {
        try {
            this.rating = this.userRatings.find((p) => p.product_id === product).rating;
        }
        catch (TypeError) {
            this.rating = 0;
        }
        return this.rating;
    }
    doSetProductRating(user, product, rating) {
        this.apiService.setProductRating(user, product, rating).subscribe(() => {
            this.rating = rating;
        });
    }
    hasProductBeenBought(product) {
        try {
            return !!this.orders.find((o) => o.products.find((p) => p.product.id === product));
        }
        catch (TypeError) {
            return false;
        }
    }
    isInBasket(product) {
        return this.basket.length > 0 ? this.basketService.isInBasket(product) : false;
    }
    doAddToBasket(id, amount) {
        this.basketService.addToBasket(id, amount);
    }
    scrollToTop() {
        this.scroll.scrollToPosition([0, 0]);
    }
    onScroll() {
        this.pageYoffset = window.pageYOffset;
    }
    onWheel(product, event) {
        event.preventDefault();
        if (event.deltaY > 0) {
            if (product.amount > 1) {
                product.amount -= 1;
            }
        }
        else {
            product.amount += 1;
        }
    }
};
ListComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
    { type: _basket_service__WEBPACK_IMPORTED_MODULE_7__["BasketService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["ViewportScroller"] },
    { type: _login_service__WEBPACK_IMPORTED_MODULE_10__["LoginService"] }
];
ListComponent.propDecorators = {
    paginator: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginator"],] }],
    onScroll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostListener"], args: ['window:scroll', ['$event'],] }]
};
ListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-list',
        template: _raw_loader_list_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_list_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ListComponent);



/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./app.component.html */ "VzVu");
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component.scss */ "ynWL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angularx-social-login */ "ahC7");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./api.service */ "yTNM");
/* harmony import */ var _basket_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./basket.service */ "ECui");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./login.service */ "edGd");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "8tEE");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");












let AppComponent = class AppComponent {
    constructor(apiService, basketService, authService, loginService) {
        this.apiService = apiService;
        this.basketService = basketService;
        this.authService = authService;
        this.loginService = loginService;
        this.faGoogle = _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_10__["faGoogle"];
        this.faBars = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__["faBars"];
        this.categories = [];
        this.basket = [];
        this.isAuth = false;
        this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.logoSrc = 'assets/images/logo.png';
        this.basketService.basket$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(data => {
            this.basket = data;
        });
        this.apiService.init().subscribe((data) => {
            this.loginService.login({ token: data.token });
        }, (err) => {
            this.loginService.logout();
        });
        this.loginService.isAuth$.subscribe((data) => {
            this.isAuth = data;
        });
        this.authService.authState.subscribe(user => {
            this.user = user;
        });
        this.apiService.getCategoryList().subscribe((res) => {
            this.categories = res;
        });
    }
    signInWithGoogle() {
        this.authService.signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_6__["GoogleLoginProvider"].PROVIDER_ID).then(res => {
            this.authService.authState.subscribe(user => {
                this.apiService.loginByGoogle(user).subscribe((rez) => {
                    this.loginService.login(rez);
                });
            });
        });
    }
    signOut() {
        this.loginService.logout();
    }
};
AppComponent.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: _basket_service__WEBPACK_IMPORTED_MODULE_8__["BasketService"] },
    { type: angularx_social_login__WEBPACK_IMPORTED_MODULE_6__["SocialAuthService"] },
    { type: _login_service__WEBPACK_IMPORTED_MODULE_9__["LoginService"] }
];
AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AppComponent);



/***/ }),

/***/ "VzVu":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"app-content\" fxLayout=\"column\" fxFlexFill>\n  <div id=\"app-header\" fxFlex=\"60px\" fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"10px\">\n    <a href=\"#\" [routerLink]=\"'catalog'\"><img id=\"logo\" [src]=logoSrc\n                                              alt=\"logo\" (error)=\"logoSrc='static/angular/assets/images/logo.png'\"></a>\n    <div fxLayout=\"row\" fxFlex=\"100\" fxLayoutAlign=\"end center\" fxLayoutGap=\"10px\">\n<!--      {{basket|json}}-->\n      <button mat-raised-button [routerLink]=\"'basket'\" color=\"primary\" *ngIf=\"basket.length > 0\"\n              matBadge=\"{{ basket.length }}\" matBadgePosition=\"before\" matBadgeColor=\"accent\">\n        Корзина\n      </button>\n\n      <mat-button-toggle-group class=\"catalog\">\n        <mat-button-toggle [routerLink]=\"'catalog'\">\n          Каталог\n        </mat-button-toggle>\n        <mat-button-toggle class=\"drop-down-button\" [matMenuTriggerFor]=\"category\">\n          <fa-icon [icon]=\"faBars\"></fa-icon>\n        </mat-button-toggle>\n      </mat-button-toggle-group>\n\n      <ng-container>\n        <button *ngIf=\"!isAuth\" mat-mini-fab (click)=\"signInWithGoogle()\" color=\"warn\">\n          <fa-icon [icon]=\"faGoogle\"></fa-icon>\n        </button>\n        <mat-button-toggle-group class=\"profile-orders\">\n        <mat-button-toggle *ngIf=\"isAuth\" [routerLink]=\"'profile'\">Профиль</mat-button-toggle>\n        <mat-button-toggle *ngIf=\"isAuth\" [routerLink]=\"'orders'\">Заказы</mat-button-toggle>\n        </mat-button-toggle-group>\n        <button *ngIf=\"isAuth\" mat-raised-button (click)=\"signOut()\" color=\"warn\">Выход</button>\n      </ng-container>\n\n      <mat-menu #category=\"matMenu\">\n        <ng-container *ngFor=\"let item of categories\">\n          <button\n            mat-menu-item\n            [routerLink]=\"['catalog/cat',item.id]\"\n            [matMenuTriggerFor]=\"subitem\">\n            {{ item.name }}\n          </button>\n          <mat-menu #subitem=\"matMenu\">\n            <button\n              *ngFor=\"let subitem of item['subcategories']\"\n              [routerLink]=\"['catalog/subcat',subitem.id]\"\n              mat-menu-item>\n              {{ subitem.name }}\n            </button>\n          </mat-menu>\n        </ng-container>\n      </mat-menu>\n\n    </div>\n  </div>\n\n    <router-outlet>\n    </router-outlet>\n\n  <div id=\"app-footer\" fxLayout=\"row\" fxLayoutAlign=\"center center\" fxFlexOffset=\"20px\" fxFlex=\"40px\">\n    @Copyright reCommendme | powered by Angular & Django\n  </div>\n</div>\n");

/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: interceptorProviders, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interceptorProviders", function() { return interceptorProviders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _basket_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./basket.service */ "ECui");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/cdk/layout */ "0MNC");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/grid-list */ "zkoq");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "6NWb");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! angularx-social-login */ "ahC7");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./login.service */ "edGd");
/* harmony import */ var _auth_interceptor_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./auth-interceptor.service */ "3IFh");
/* harmony import */ var _catalog_catalog_module__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./catalog/catalog.module */ "6J3s");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");






























const interceptorProviders = [
    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_17__["HTTP_INTERCEPTORS"], useClass: _auth_interceptor_service__WEBPACK_IMPORTED_MODULE_27__["AuthInterceptorService"], multi: true }
];
let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"].withServerTransition({ appId: 'serverApp' }),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_17__["HttpClientModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_16__["ReactiveFormsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_9__["MatSelectModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__["MatMenuModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
            _angular_material_badge__WEBPACK_IMPORTED_MODULE_14__["MatBadgeModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__["MatButtonToggleModule"],
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_19__["LayoutModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_20__["MatToolbarModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_21__["MatSidenavModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_22__["MatListModule"],
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_23__["MatGridListModule"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_25__["SocialLoginModule"],
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_24__["FontAwesomeModule"],
            _catalog_catalog_module__WEBPACK_IMPORTED_MODULE_28__["CatalogModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_29__["NgbModule"],
        ],
        providers: [
            _basket_service__WEBPACK_IMPORTED_MODULE_18__["BasketService"],
            _login_service__WEBPACK_IMPORTED_MODULE_26__["LoginService"],
            _auth_interceptor_service__WEBPACK_IMPORTED_MODULE_27__["AuthInterceptorService"],
            interceptorProviders,
            {
                provide: 'SocialAuthServiceConfig',
                useValue: {
                    autoLogin: false,
                    providers: [
                        {
                            id: angularx_social_login__WEBPACK_IMPORTED_MODULE_25__["GoogleLoginProvider"].PROVIDER_ID,
                            provider: new angularx_social_login__WEBPACK_IMPORTED_MODULE_25__["GoogleLoginProvider"]('1006137623360-702sli4kq5e8v4fiq4p536fdsq5qb1hq.apps.googleusercontent.com')
                        }
                    ]
                },
            }
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "edGd":
/*!**********************************!*\
  !*** ./src/app/login.service.ts ***!
  \**********************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");



let LoginService = class LoginService {
    constructor() {
        this.isAuth$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.storage = localStorage;
    }
    getToken() {
        return this.storage.getItem('access_token');
    }
    setToken(value) {
        this.storage.setItem('access_token', value);
    }
    login(user) {
        this.setToken(user.token);
        this.isAuth$.next(true);
    }
    logout() {
        this.isAuth$.next(false);
        this.storage.removeItem('access_token');
    }
};
LoginService.ctorParameters = () => [];
LoginService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], LoginService);



/***/ }),

/***/ "gEhI":
/*!**************************************************!*\
  !*** ./src/app/catalog/list/list.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-paginator {\n  background-color: transparent;\n  font-size: initial;\n}\n\n.dummy {\n  background-color: #f5f5f5;\n}\n\n.dummy, mat-card {\n  min-height: 310px;\n}\n\nmat-card {\n  margin-top: 10px;\n  border: 1px solid transparent;\n}\n\nmat-card-title, mat-card-subtitle {\n  width: 185px;\n}\n\nmat-card-title {\n  font-size: 14px !important;\n  padding-bottom: 10px;\n  margin: 0 !important;\n}\n\nmat-card-subtitle, .mat-cart-subtitle {\n  text-align: right;\n}\n\n.category-title, .subcategory-title, .common-rating {\n  margin: 0 !important;\n}\n\n.category-title button, .subcategory-title button {\n  padding: 0;\n}\n\n.common-rating {\n  padding-top: 5px;\n}\n\nmat-card-subtitle > button {\n  font-size: 12px;\n  line-height: 0;\n}\n\nmat-card:hover {\n  border: 1px solid #3F51B5;\n}\n\nmat-card:hover mat-card-title {\n  white-space: normal;\n}\n\n#title-text {\n  font-size: 30px;\n}\n\n.description {\n  width: 120px;\n  text-align: end;\n  font-size: 12px;\n}\n\n.description span {\n  display: block;\n}\n\n.example-header-image {\n  width: 50px;\n  text-align: center;\n  margin-right: 16px;\n}\n\n.cat-img {\n  object-fit: cover;\n  width: 100%;\n  height: 100%;\n}\n\n.mat-card-image {\n  height: 100%;\n  width: 100px;\n  object-fit: contain;\n  margin: 0 !important;\n  cursor: pointer;\n}\n\n.mat-card-content {\n  margin: 0 !important;\n  height: 110px;\n}\n\nmat-card-actions {\n  margin: 0 !important;\n  display: flex;\n  place-content: space-around;\n}\n\nbutton.mat-stroked-button.price {\n  color: #8e8181;\n  border: none;\n}\n\n.plus-minus-group {\n  height: 48px;\n}\n\n.plus-minus {\n  height: 24px;\n}\n\n.count {\n  color: #8e8181;\n}\n\n.to-basket {\n  margin: 0 !important;\n}\n\n.star-background {\n  font-size: 1.2rem;\n  position: relative;\n  display: inline-block;\n  color: #b0c4de;\n}\n\n.star-background .full, .star-foreground {\n  position: absolute;\n  display: inline-block;\n  overflow: hidden;\n  color: #1e90ff;\n}\n\n.star-read {\n  color: #b01c1c;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxsaXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNkJBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLDZCQUFBO0FBQ0Y7O0FBS0E7RUFDRSxZQUFBO0FBRkY7O0FBUUE7RUFDRSwwQkFBQTtFQUNBLG9CQUFBO0VBQ0Esb0JBQUE7QUFMRjs7QUFRQTtFQUNFLGlCQUFBO0FBTEY7O0FBUUE7RUFDRSxvQkFBQTtBQUxGOztBQVFBO0VBQ0UsVUFBQTtBQUxGOztBQVFBO0VBQ0UsZ0JBQUE7QUFMRjs7QUFRQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBTEY7O0FBUUE7RUFLRSx5QkFBQTtBQVRGOztBQUtFO0VBQ0UsbUJBQUE7QUFISjs7QUFTQTtFQUNFLGVBQUE7QUFORjs7QUFTQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQU5GOztBQVNBO0VBQ0UsY0FBQTtBQU5GOztBQVVBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFQRjs7QUFVQTtFQUNFLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFQRjs7QUFXQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGVBQUE7QUFSRjs7QUFXQTtFQUNFLG9CQUFBO0VBQ0EsYUFBQTtBQVJGOztBQVdBO0VBQ0Usb0JBQUE7RUFDQSxhQUFBO0VBQ0EsMkJBQUE7QUFSRjs7QUFXQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0FBUkY7O0FBV0E7RUFDRSxZQUFBO0FBUkY7O0FBV0E7RUFDRSxZQUFBO0FBUkY7O0FBV0E7RUFDRSxjQUFBO0FBUkY7O0FBV0E7RUFDRSxvQkFBQTtBQVJGOztBQVdBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtBQVJGOztBQVdBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQVJGOztBQWNBO0VBQ0UsY0FBQTtBQVhGIiwiZmlsZSI6Imxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtcGFnaW5hdG9yIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBmb250LXNpemU6IGluaXRpYWw7XHJcbn1cclxuXHJcbi5kdW1teSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNVxyXG59XHJcblxyXG4uZHVtbXksIG1hdC1jYXJkIHtcclxuICBtaW4taGVpZ2h0OiAzMTBweDtcclxufVxyXG5cclxubWF0LWNhcmQge1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbm1hdC1jYXJkLWhlYWRlciB7XHJcbn1cclxuXHJcbm1hdC1jYXJkLXRpdGxlLCBtYXQtY2FyZC1zdWJ0aXRsZSB7XHJcbiAgd2lkdGg6IDE4NXB4O1xyXG4gIC8vb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAvL3RleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIC8vd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxubWF0LWNhcmQtdGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG4gIG1hcmdpbjogMCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5tYXQtY2FyZC1zdWJ0aXRsZSwgLm1hdC1jYXJ0LXN1YnRpdGxlIHtcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxufVxyXG5cclxuLmNhdGVnb3J5LXRpdGxlLCAuc3ViY2F0ZWdvcnktdGl0bGUsIC5jb21tb24tcmF0aW5nIHtcclxuICBtYXJnaW46IDAgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmNhdGVnb3J5LXRpdGxlIGJ1dHRvbiwgLnN1YmNhdGVnb3J5LXRpdGxlIGJ1dHRvbiB7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG5cclxuLmNvbW1vbi1yYXRpbmcge1xyXG4gIHBhZGRpbmctdG9wOiA1cHg7XHJcbn1cclxuXHJcbm1hdC1jYXJkLXN1YnRpdGxlID4gYnV0dG9uIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgbGluZS1oZWlnaHQ6IDA7XHJcbn1cclxuXHJcbm1hdC1jYXJkOmhvdmVyIHtcclxuICBtYXQtY2FyZC10aXRsZSB7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xyXG4gIH1cclxuXHJcbiAgYm9yZGVyOiAxcHggc29saWQgIzNGNTFCNTtcclxufVxyXG5cclxuI3RpdGxlLXRleHQge1xyXG4gIGZvbnQtc2l6ZTogMzBweDtcclxufVxyXG5cclxuLmRlc2NyaXB0aW9uIHtcclxuICB3aWR0aDogMTIwcHg7XHJcbiAgdGV4dC1hbGlnbjogZW5kO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuLmRlc2NyaXB0aW9uIHNwYW4ge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4vLyBjYXRlZ29yeSBpbWFnZVxyXG4uZXhhbXBsZS1oZWFkZXItaW1hZ2Uge1xyXG4gIHdpZHRoOiA1MHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tcmlnaHQ6IDE2cHg7XHJcbn1cclxuXHJcbi5jYXQtaW1nIHtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi8vIHByb2R1Y3QgaW1hZ2VcclxuLm1hdC1jYXJkLWltYWdlIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XHJcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ubWF0LWNhcmQtY29udGVudCB7XHJcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XHJcbiAgaGVpZ2h0OiAxMTBweDtcclxufVxyXG5cclxubWF0LWNhcmQtYWN0aW9ucyB7XHJcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBwbGFjZS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbn1cclxuXHJcbmJ1dHRvbi5tYXQtc3Ryb2tlZC1idXR0b24ucHJpY2Uge1xyXG4gIGNvbG9yOiAjOGU4MTgxO1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuLnBsdXMtbWludXMtZ3JvdXAge1xyXG4gIGhlaWdodDogNDhweDtcclxufVxyXG5cclxuLnBsdXMtbWludXMge1xyXG4gIGhlaWdodDogMjRweDtcclxufVxyXG5cclxuLmNvdW50IHtcclxuICBjb2xvcjogIzhlODE4MTtcclxufVxyXG5cclxuLnRvLWJhc2tldCB7XHJcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5zdGFyLWJhY2tncm91bmQge1xyXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgY29sb3I6ICNiMGM0ZGU7XHJcbn1cclxuXHJcbi5zdGFyLWJhY2tncm91bmQgLmZ1bGwsIC5zdGFyLWZvcmVncm91bmQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBjb2xvcjogIzFlOTBmZjtcclxufVxyXG4ucmVhZCAuc3Rhci1iYWNrZ3JvdW5kIHtcclxuICAvL2ZvbnQtc2l6ZTogMS4xZW07XHJcbn1cclxuXHJcbi5zdGFyLXJlYWQge1xyXG4gIGNvbG9yOiAjYjAxYzFjO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



const routes = [
    {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full',
    },
    {
        path: 'profile',
        loadChildren: () => __webpack_require__.e(/*! import() | profile-profile-module */ "profile-profile-module").then(__webpack_require__.bind(null, /*! ./profile/profile.module */ "cRhG")).then(m => m.ProfileModule),
    },
    {
        path: 'basket',
        loadChildren: () => __webpack_require__.e(/*! import() | basket-basket-module */ "basket-basket-module").then(__webpack_require__.bind(null, /*! ./basket/basket.module */ "SCLQ")).then(m => m.BasketModule),
    },
    {
        path: 'catalog',
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./catalog/catalog.module */ "6J3s")).then(m => m.CatalogModule),
    },
    {
        path: 'orders',
        loadChildren: () => __webpack_require__.e(/*! import() | order-order-module */ "order-order-module").then(__webpack_require__.bind(null, /*! ./order/order.module */ "+p+5")).then(m => m.OrderModule),
    },
    {
        path: '**',
        redirectTo: '/'
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { initialNavigation: 'enabledBlocking' })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "wFaY":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/catalog/list/list.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"app-center\" fxFlex=\"100\" fxLayoutAlign=\"center\" fxLayout=\"row wrap\">\r\n  <ng-container *ngIf=\"loading\">\r\n    <div fxFlex=\"70\" fxLayout=\"row wrap\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\">\r\n      <mat-card class=\"example-card dummy\" *ngFor=\"let i of [].constructor(24)\"\r\n                fxFlex=\"300px\" fxLayout=\"column wrap\" fxLayoutAlign=\"center center\">\r\n        <mat-spinner></mat-spinner>\r\n      </mat-card>\r\n      <div></div>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"!loading\">\r\n    <div class=\"products\" fxFlex=\"70\" fxLayout=\"row wrap\" fxLayoutAlign=\"center\" fxLayoutGap=\"10px\">\r\n      <mat-card class=\"example-card\" *ngFor=\"let product of products\"\r\n                fxFlex=\"300px\" fxLayout=\"column wrap\" fxLayoutAlign=\"center\">\r\n        <mat-card-header>\r\n          <div mat-card-avatar class=\"example-header-image\">\r\n            <a href=\"#\" [routerLink]=\"['/catalog/cat/',product['category']['id']]\">\r\n              <img class=\"cat-img\" src=\"{{ product['category']['image'] }}\"\r\n                   [alt]=\"product['category']['name']\" [title]=\"product['category']['name']\">\r\n            </a>\r\n          </div>\r\n          <mat-card-title>{{ product['name'] }}</mat-card-title>\r\n          <mat-card-subtitle class=\"category-title\">\r\n            <button mat-flat-button\r\n                    [routerLink]=\"['/catalog/cat/',product['category']['id']]\">{{ product['category']['name'] }}</button>\r\n          </mat-card-subtitle>\r\n          <mat-card-subtitle class=\"subcategory-title\">\r\n            <button mat-flat-button\r\n                    [routerLink]=\"['/catalog/subcat/',product['subcategory']['id']]\">{{ product['subcategory']['name'] }}</button>\r\n          </mat-card-subtitle>\r\n          <mat-card-subtitle class=\"common-rating\">\r\n            <ngb-rating [(rate)]=\"product['common_rating']\" [max]=\"5\" [readonly]=true class=\"read\">\r\n              <ng-template let-fill=\"fill\">\r\n                <span class=\"star-background\" [class.full]=\"fill === 100\">\r\n                  <span class=\"star-foreground star-read\" [style.width.%]=\"fill\">&#9733;</span>&#9733;\r\n                </span>\r\n              </ng-template>\r\n            </ngb-rating>\r\n          </mat-card-subtitle>\r\n        </mat-card-header>\r\n        <mat-card-content fxLayoutAlign=\"space-around center\">\r\n          <img mat-card-image [src]=\"product['image']\" [alt]=\"product['name']\"\r\n               lightbox [fullImage]=\"{path: product['image'] }\">\r\n\r\n          <div class=\"description\">\r\n            <span *ngIf=\"isAuth && hasProductBeenBought(product['id'])\" style=\"padding-bottom: 5px;\">\r\n              <ng-container *ngIf=\"productUserRating(product['id'])>0\">Ваша оценка</ng-container>\r\n              <ng-container *ngIf=\"rating===0\">Оцените продукт</ng-container>\r\n              <ngb-rating [(rate)]=\"rating\" [max]=\"5\" [readonly]=false\r\n                        (rateChange)=\"doSetProductRating(user, product['id'], rating)\">\r\n              <ng-template let-fill=\"fill\">\r\n                <span class=\"star-background\" [class.full]=\"fill === 100\">\r\n                  <span class=\"star-foreground\" [style.width.%]=\"fill\">&#x2764;</span>&#x2764;\r\n                </span>\r\n              </ng-template>\r\n            </ngb-rating>\r\n          </span>\r\n          </div>\r\n\r\n        </mat-card-content>\r\n        <mat-card-actions>\r\n          <!--  TODO поиск товара -->\r\n          <button class=\"price\" mat-stroked-button disabled>{{product['price']}} ₽</button>\r\n          <mat-button-toggle-group (wheel)=\"onWheel(product, $event)\">\r\n            <mat-button-toggle class=\"count\" disabled>{{product['amount']}} шт</mat-button-toggle>\r\n            <mat-button-toggle-group vertical class=\"plus-minus-group\">\r\n              <mat-button-toggle class=\"plus-minus\" (click)=\"product['amount'] = product['amount'] + 1\">+\r\n              </mat-button-toggle>\r\n              <mat-button-toggle class=\"plus-minus\" (click)=\"product['amount'] = product['amount'] - 1\">-\r\n              </mat-button-toggle>\r\n            </mat-button-toggle-group>\r\n          </mat-button-toggle-group>\r\n          <button *ngIf=\"isInBasket(product['id'])\" mat-raised-button class=\"to-basket\" color=\"primary\"\r\n                  (click)=\"doAddToBasket(product['id'], product['amount'])\">\r\n            <fa-icon [icon]=\"faCartPlus\" style=\"font-size: 20px;\"></fa-icon>\r\n          </button>\r\n          <button *ngIf=\"!isInBasket(product['id'])\" mat-raised-button class=\"to-basket\" color=\"accent\"\r\n                  (click)=\"doAddToBasket(product['id'], product['amount'])\">\r\n            <fa-icon [icon]=\"faCartArrowDown\" style=\"font-size: 20px;\"></fa-icon>\r\n          </button>\r\n        </mat-card-actions>\r\n      </mat-card>\r\n      <!-- костыль для правильного margin-right последней карточки продукта на странице, вызванного fxLayoutGap=\"10px\" -->\r\n      <div></div>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <div fxFlex=\"100\" fxLayoutAlign=\"end center\" style=\"margin-top: 10px\">\r\n    <button mat-raised-button (click)=\"scrollToTop()\" color=\"warn\">Наверх</button>\r\n    <mat-paginator [length]=\"productsCount\"\r\n                   [pageSize]=\"limit\"\r\n                   [showFirstLastButtons]=true\r\n                   (page)=\"pageEvent = getPaginatorData($event)\">\r\n    </mat-paginator>\r\n  </div>\r\n\r\n\r\n</div>\r\n");

/***/ }),

/***/ "yTNM":
/*!********************************!*\
  !*** ./src/app/api.service.ts ***!
  \********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/environment */ "AytR");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
    }
    getProductList(pars, limit, offset) {
        if (pars.hasOwnProperty('cat')) {
            return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/product_list?category=${pars.cat}` +
                `&limit=${limit}&offset=${offset}`);
        }
        if (pars.hasOwnProperty('subcat')) {
            return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/product_list?subcategory=${pars.subcat}` +
                `&limit=${limit}&offset=${offset}`);
        }
        return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/product_list` +
            `?limit=${limit}&offset=${offset}`);
    }
    getCategoryList() {
        return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/category_list`);
    }
    getUserRatings(user) {
        return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/user_rating_list`, { user });
    }
    setProductRating(user, product, rating) {
        console.log(user, product, rating);
        return this.http.patch(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/user_rating_list`, { user, product, rating });
    }
    getBasketInfo(pars) {
        return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/basket_list`, { products: pars });
    }
    loginByGoogle(data) {
        return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/google_auth`, data);
    }
    init() {
        return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/init`);
    }
    changeUserProfile(user, firstName, phone, address) {
        return this.http.patch(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/user_profile`, { user, firstName, phone, address });
    }
    submitBasket(data) {
        return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/basket_submit`, data);
    }
    getOrderList(user) {
        return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl}v1/market/order_list`, { consumer: user });
    }
};
ApiService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
ApiService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ApiService);



/***/ }),

/***/ "ynWL":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#app-header {\n  border-bottom: 1px solid #3F51B5;\n  padding: 0 10px 0 10px;\n  margin-bottom: 20px;\n}\n\n#logo {\n  width: 300px;\n}\n\n#app-content {\n  height: 100%;\n  padding: 5px;\n}\n\n#app-footer {\n  border-top: 1px solid #606db7;\n}\n\nrouter-outlet {\n  margin: 0 !important;\n}\n\nmat-button-toggle-group {\n  max-height: 36px;\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  border: none;\n  color: #fff;\n}\n\nmat-button-toggle-group:active {\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\nmat-button-toggle {\n  color: #fff;\n  align-self: center;\n  font-size: 14px;\n}\n\n.catalog mat-button-toggle {\n  background-color: #3f51b5;\n}\n\n.profile-orders mat-button-toggle {\n  background-color: #9a5276;\n}\n\n.mat-button-toggle-checked {\n  color: #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0NBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsNkJBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLHVIQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLHlIQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7QUFDRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjYXBwLWhlYWRlciB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzRjUxQjU7XHJcbiAgcGFkZGluZzogMCAxMHB4IDAgMTBweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4jbG9nbyB7XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG59XHJcblxyXG4jYXBwLWNvbnRlbnQge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbiNhcHAtZm9vdGVyIHtcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzYwNmRiNztcclxufVxyXG5cclxucm91dGVyLW91dGxldCB7XHJcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwIHtcclxuICBtYXgtaGVpZ2h0OiAzNnB4O1xyXG4gIGJveC1zaGFkb3c6IDAgM3B4IDFweCAtMnB4IHJnYigwIDAgMCAvIDIwJSksIDBweCAycHggMnB4IDBweCByZ2IoMCAwIDAgLyAxNCUpLCAwcHggMXB4IDVweCAwcHggcmdiKDAgMCAwIC8gMTIlKTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwOmFjdGl2ZSB7XHJcbiAgYm94LXNoYWRvdzogMCA1cHggNXB4IC0zcHggcmdiKDAgMCAwIC8gMjAlKSwgMHB4IDhweCAxMHB4IDFweCByZ2IoMCAwIDAgLyAxNCUpLCAwcHggM3B4IDE0cHggMnB4IHJnYigwIDAgMCAvIDEyJSk7XHJcbn1cclxuXHJcbm1hdC1idXR0b24tdG9nZ2xlIHtcclxuICBjb2xvcjogI2ZmZjtcclxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4uY2F0YWxvZyBtYXQtYnV0dG9uLXRvZ2dsZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNmNTFiNTtcclxufVxyXG5cclxuLnByb2ZpbGUtb3JkZXJzIG1hdC1idXR0b24tdG9nZ2xlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWE1Mjc2O1xyXG59XHJcblxyXG4ubWF0LWJ1dHRvbi10b2dnbGUtY2hlY2tlZCB7XHJcbiAgY29sb3I6ICNmZmY7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
document.addEventListener('DOMContentLoaded', () => {
    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
        .catch(err => console.error(err));
});


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-1ade76e0c295f5e228d2.js.map