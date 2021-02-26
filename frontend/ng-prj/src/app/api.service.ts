import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getCategoryList(): any {
    return this.http.get(`${environment.backendUrl}v1/market/category_list/`);
  }

  getProductList(pars: any): any {
    if (pars.hasOwnProperty('cat')) {
      return this.http.get(`${environment.backendUrl}v1/market/product_list?category=${pars.cat}`);
    }
    if (pars.hasOwnProperty('subcat')) {
      return this.http.get(`${environment.backendUrl}v1/market/product_list?subcategory=${pars.subcat}`);
    }
    return this.http.get(`${environment.backendUrl}v1/market/product_list/`);
  }

  getBasketInfo(pars: any): any {
    const data = {ids: pars};
    return this.http.post(`${environment.backendUrl}v1/market/basket_list/`, data);
  }
}
