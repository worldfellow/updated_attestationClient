import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: any;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = JSON.parse(localStorage.getItem('user')!);
    // Modify the request before sending it
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: this.token.data.token
      }
    });
    return next.handle(modifiedReq);
  }
}