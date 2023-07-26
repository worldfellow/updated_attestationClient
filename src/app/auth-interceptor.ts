// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   token: any;
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     this.token = JSON.parse(localStorage.getItem('user')!);
//     // Modify the request before sending it
//     const modifiedReq = req.clone({
//       setHeaders: {
//         Authorization: this.token.data.token
//       }
//     });
//     return next.handle(modifiedReq);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.data && user.data.token) {
      
      const modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.data.token}`
        }
      });

      return next.handle(modifiedReq).pipe(
        catchError(error => {
          // Handle HTTP errors, unauthorized responses, etc.
          // You can log or handle errors here as needed
          return throwError(error);
        })
      );
    } else {
      // If the user token is not present or invalid, proceed with the original request
      return next.handle(req);
    }
  }
}
