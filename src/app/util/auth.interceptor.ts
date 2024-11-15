import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken'); // Obtén el token almacenado (o Basic Auth info)
    console.log(token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${token}` // Añade encabezado Authorization con el token almacenado
        }
      });
    }

    return next.handle(request);
  }
}
