import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError, pipe } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  headers = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
    body: "data",
    // tslint:disable-next-line: max-line-length
    "Access-Control-Allow-Headers":
      // tslint:disable-next-line: max-line-length
      "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",

    Authorization: localStorage.getItem("token")
  });
  constructor(private httpClient: HttpClient) { }
  schoolError: any;




  public classDropdown(schoolCd: any) {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/getDistinctValues?schoolCd=${schoolCd}&fieldname=CLASSROOM`,

      { headers: this.headers }
    );
  }
  // ======================================================================================================================================================
  /*
  API Call For DESIGNATION Dropdown
  */

  public designation() {
    return this.httpClient.get(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/getDistinctEmployeeValues?schoolCd=AKSHAR&fieldname=DESIGNATION"
    );
  }
  // ======================================================================================================================================================
  /*
  API Call For Blood Groups Dropdown
  */
  public studentBloodGroup() {
    return this.httpClient.get(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/getDistinctValues?schoolCd=AKSHAR&fieldname=BLOOD_GROUP`
    );
  }

  public bloodGroup() {
    return this.httpClient.get(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/getDistinctEmployeeValues?schoolCd=AKSHAR&fieldname=BLOOD_GROUP"
    );
  }
  // ======================================================================================================================================================
  /*
  API Call For QUALIFICATIONS Dropdown
  */

  public qualification() {
    return this.httpClient.get(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/getDistinctEmployeeValues?schoolCd=AKSHAR&fieldname=QUALIFICATION"
    );
  }
  // ======================================================================================================================================================
  public sectionDropdown(schoolCd: any, classroom: any) {
    console.log(schoolCd, classroom);
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/getSections?schoolCd=${schoolCd}&classroom=${classroom}`,

      { headers: this.headers }
    );
  }

  public studentSearchByfield(studentdata: any) {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/forGivenClass&Section?schoolCd=${studentdata.schoolCd}&classroom=${studentdata.classroom}&section=${studentdata.section}`,

      { headers: this.headers }
    );
  }
  public postStudentSearch(studentdata: any) {
    console.log(studentdata);

    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/schoolCd/${studentdata}`,

      { headers: this.headers }
    );
  }
  public getDropdownSchool(): Observable<object> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile",
      { headers: this.headers }
    );
  }

  public postEmployeeSearch(data: any) {
    console.log(data.search);
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/schoolCd/${data}`,

      { headers: this.headers }
    );
  }

  public postStudent(student: any) {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/",
      student,
      { headers: this.headers }
    );
  }
  // GET School Service
  public getSchool(): Observable<object> {

    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile/",

      { headers: this.headers }
    );
  }

  // End GET School Service

  // Update School Service

  public updateSchool(data: any): Observable<object> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.put(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile",
      data,
      { headers: this.headers }
    );
  }

  public updateStudent(student: any): Observable<object> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.put(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/",
      student,
      { headers: this.headers }
    );
  }

  public updateEmpolyee(empolyee: any): Observable<object> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.put(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/",
      empolyee,
      { headers: this.headers }
    );
  }

  // End Update School Service

  public deleteSchool(schoolId): Observable<object> {
    console.log(schoolId);
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile/${schoolId}`,

      { headers: this.headers }
    );
  }

  public deleteEmployee(employeeProfileId): Observable<object> {
    console.log(employeeProfileId);
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/${employeeProfileId}`,

      { headers: this.headers }
    );
  }

  public deleteStudent(studentProfileId): Observable<object> {
    console.log(studentProfileId);
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/${studentProfileId}`,

      { headers: this.headers }
    );
  }

  public postSchool(school: any) {
    console.log(school, "service post school");
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/SchoolProfile/",
      school,

      { headers: this.headers }
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
      "http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/",
      employee,
      { headers: this.headers }
    );
  }
  public postStudentstatus(student: any) {
    // tslint:disable-next-line: max-line-length
    console.log(student, "service error");
    return this.httpClient.put(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/StudentProfile/updateList`,
      student,
      { headers: this.headers }
    );
  }

  public postEmpolyeestatus(employee: any) {
    // tslint:disable-next-line: max-line-length
    console.log(employee, "service error");
    return this.httpClient.put(
      `http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/updateList`,
      employee,
      { headers: this.headers }
    );
  }
}
