import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.httpCli.post(`http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/auth/sendOtp?mobileNumber=${oneTimePassword.mobileNumber}`, oneTimePassword);
  }
  login(login): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpCli.post(`http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/auth/validateOtp?mobileNumber=${login.mobileNumber}&OTP=${+login.OTP}`, login);
  }
}
