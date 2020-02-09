import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class ApiService {
 headers = new HttpHeaders({
 'Access-Control-Allow-Origin': '*',
 'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
 body: 'data',
 // tslint:disable-next-line: max-line-length
 'Access-Control-Allow-Headers':
 // tslint:disable-next-line: max-line-length
 'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',

 Authorization: 'bd154e74b14786d58d67641a096903e9'
 });
 constructor(private httpClient: HttpClient) {}

 // Auth Api Start



 



 //Auth Api End



 public postStudentSearch(studentdata: any) {
  console.log(studentdata.search);

  // tslint:disable-next-line: max-line-length
  return this.httpClient.get(
    `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/schoolCd/${studentdata.search}`,

  { headers: this.headers}
  );
  }
 public getDropdownSchool(): Observable<object> {
  // tslint:disable-next-line: max-line-length
  return this.httpClient.get(
  'http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile',
  { headers: this.headers }
  );
  }

public postEmployeeSearch(data: any) {
  console.log(data.search);
  // tslint:disable-next-line: max-line-length
  return this.httpClient.get(

    `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/schoolCd/${data.search}`,

  { headers: this.headers}
  );
  }

 public postStudent(student: any) {
  // tslint:disable-next-line: max-line-length
  return this.httpClient.post(
  'http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/',
  student,
  { headers: this.headers}
  );
  }
 public getSchool(): Observable<object> {
 // tslint:disable-next-line: max-line-length
 return this.httpClient.get(
 'http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile',
 { headers: this.headers }
 );
 }
 public postSchool(school: any) {
 // tslint:disable-next-line: max-line-length
 return this.httpClient.post(
 'http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile/',
 school,
 { headers: this.headers}
 );
 }

//  public getEmployees(): Observable<object> {
//  // tslint:disable-next-line: max-line-length
//  return this.httpClient.get(
//  'http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/schoolCd/AKSHAR',
//  { headers: this.headers }
//  );
//  }
 public postEmployee(employee: any) {
 // tslint:disable-next-line: max-line-length
 return this.httpClient.post(
 'http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/',
 employee,
 { headers: this.headers }
 );
 }
 public postStudentstatus(studentProfileId: number) {
  // tslint:disable-next-line: max-line-length
  return this.httpClient.post(
  'http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/',
  studentProfileId,
  { headers: this.headers}
  );
  }
}
