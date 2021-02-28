import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

      const idToken = this.loginService.getToken();

      if (idToken) {
          const cloned = req.clone({
              headers: req.headers.set('Authorization',
                  'Token ' + idToken)
          });
          return next.handle(cloned);
        } else {
            return next.handle(req.clone());
        }


    }
}
