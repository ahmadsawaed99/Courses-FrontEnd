import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector : Injector, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    // let authService = this.injector.get(AuthService)
    let jwtToken = req.clone({
      setHeaders : {
        'Authorization' :'Bearer ' + this.authService.GetToken()
      }
    })
    return next.handle(jwtToken)

  }
}
