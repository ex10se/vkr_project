import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {
  }

  getProductList(pars: any, limit: number, offset: number): Observable<object> {
    if (pars.hasOwnProperty('cat')) {
      return this.http.get(`${environment.backendUrl}v1/market/product_list?category=${pars.cat}` +
        `&limit=${limit}&offset=${offset}`);
    }
    if (pars.hasOwnProperty('subcat')) {
      return this.http.get(`${environment.backendUrl}v1/market/product_list?subcategory=${pars.subcat}` +
        `&limit=${limit}&offset=${offset}`);
    }
    return this.http.get(`${environment.backendUrl}v1/market/product_list` +
      `?limit=${limit}&offset=${offset}`);
  }

  doSearchProduct(query: string, limit: number, offset: number): Observable<object> {
    return this.http.get(`${environment.backendUrl}v1/market/product_list?searchkey=${query}` +
      `&limit=${limit}&offset=${offset}`);
  }

  getPopularProductList(limit: number, offset: number): Observable<object> {
    return this.http.get(`${environment.backendUrl}v1/market/popular_products?limit=${limit}&offset=${offset}`);
  }

  getRecommendedProductList(limit: number, offset: number): Observable<object> {
    return this.http.get(`${environment.backendUrl}v1/market/recommended_products?limit=${limit}&offset=${offset}`);
  }

  getCategoryList(): Observable<object> {
    return this.http.get(`${environment.backendUrl}v1/market/category_list`);
  }

  getUserRatings(user: number): Observable<object> {
    return this.http.post(`${environment.backendUrl}v1/market/user_rating_list`,
      {user});
  }

  setProductRating(user: number, product: number, rating: number): Observable<object> {
    return this.http.put(`${environment.backendUrl}v1/market/user_rating_list`,
      {user, product, rating});
  }

  getBasketInfo(pars: any): Observable<object> {
    return this.http.post(`${environment.backendUrl}v1/market/basket_list`, {products: pars});
  }

  loginByGoogle(data: any): Observable<object> {
    return this.http.post(`${environment.backendUrl}v1/market/google_auth`, data);
  }

  init(): Observable<object> {
    return this.http.get(`${environment.backendUrl}v1/market/init`);
  }

  changeUserProfile(user: number, firstName: string, phone: string, address: string): Observable<object> {
    return this.http.put(`${environment.backendUrl}v1/market/user_profile`,
      {user, firstName, phone, address});
  }

  submitBasket(data: any): Observable<object> {
    return this.http.post(`${environment.backendUrl}v1/market/basket_submit`, data);
  }

  getOrderList(user: any): Observable<object> {
    return this.http.post(`${environment.backendUrl}v1/market/order_list`, {consumer: user});
  }
}
