import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
 } from "@angular/common/http";
 import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token) {
    const clonedReqObj = request.clone({
    headers: request.headers.set("Authorization", token)
    });
    return next.handle(clonedReqObj);
    } else {
    return next.handle(request);
    }
    }
}



