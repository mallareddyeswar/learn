import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs' ;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
    'body':'data',
    // tslint:disable-next-line: max-line-length
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',




    Authorization: 'ddf2886634230619ed34e9ff14e1d81c',

  });



  constructor(private httpClient: HttpClient) {}
  public getSchool(): Observable<object>  {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get('http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile', { headers : this.headers, } ) ;
  }
  public postSchool(value: any)  {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post('http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile', { headers : this.headers,body:JSON.stringify(value) } ) ;
  }



  public getEmployees(): Observable<object>  {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get('http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/schoolCd/AKSHAR', { headers : this.headers } ) ;
  }
  public postEmployee(employee: any)  {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post('http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/', { headers : this.headers,body:JSON.stringify(employee) } ) ;
  }
 }
