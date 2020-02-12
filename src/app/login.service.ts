import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpCli: HttpClient) {}

  getOTP(oneTimePassword): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpCli.post(`http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/auth/sendOtp?mobileNumber=${oneTimePassword.mobileNumber}`, oneTimePassword)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.errormessage}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

  login(login): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpCli.post(`http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/auth/validateOtp?mobileNumber=${login.mobileNumber}&OTP=${+login.OTP}`, login);
  }
}
