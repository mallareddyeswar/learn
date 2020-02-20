import { ApiService } from './../../../api.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ExcelService} from './../../../excel.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

//    employees = [
//     {"id":1,"name":"Licensed Frozen Hat","description":"Incidunt et magni","price":"170.00","quantity":56840},
//     {"id":2,"name":"Rustic Concrete Chicken","description":"Sint libero mollitia","price":"302.00","quantity":9358},
//     {"id":3,"name":"Fantastic Metal Computer","description":"In consequuntur cupiditat","price":"279.00","quantity":90316},
//     {"id":4,"name":"Refined Concrete Chair","description":"Saepe nemo praesentium","price":"760.00","quantity":5899}
// ];
  employees: any;
  errorShow: any;
  schoolCd: any = localStorage.getItem('schoolCd');

  constructor(private apiService: ApiService , private router: Router, private excelservice: ExcelService ) { }

  updateForm: any = {
    employeeName: '',
    admissionNumber: '',
    qualification: '',
    designation: '',
   //  schoolCd: ' ',
    dateOfJoining: '',
    dateOfBirth: '',
    bloodGroup: '',
    phoneNumber: '',
    email: ''  ,
    aadharNbr: '',
    address: '',
    idCardStatus: '',
    schoolCd : this.schoolCd,





  };

  ngOnInit() {

    const schId = localStorage.getItem('schoolCd');
    console.log(schId);
    this.apiService.postEmployeeSearch(schId).subscribe(res => {
      if (res == null) {
        this.errorShow = true;
        //  alert(data + ' No Data User !');
        // this.ngFlashMessageService.showFlashMessage({
        //   messages: [`Sorry No Data `],
        //   type: 'danger',

        //   dismissible: true,
        // });
      } else {
        console.log('employee', res);
        this.employees = res;
      }

        });
    // this.apiService.getEmployees().subscribe(
    //   data => {
    //    this.employees = data;
    //    console.log( this.employees );
    //   },
    //   error => console.log(error)
    // );
  }


  deleteEmployee(id: any): void {
    // console.log('Delete School' + id.schoolId );
    if (window.confirm('Are you sure, you want to delete?')) {
      this.apiService.deleteEmployee(id.employeeProfileId).subscribe(data => {
        alert('Employee Deleted');
        location.reload();
      });
    }
  }

  downloadExcel(): void {
    this.excelservice.exportAsExcelFile(this.employees, 'employees_list');
  }




  onSave(employee) {

    this.apiService.updateEmpolyee(employee).subscribe(res => {
      console.log(res + 'Updated Your Employee');
      location.reload();
    });
  }
  editStudent(id: any) {
    this.updateForm = id;
    console.log(this.updateForm);
  }

  // onSearch(data) {
  //   // console.log(data);

  //   this.apiService.postEmployeeSearch(data).subscribe(res => {
  //     // console.log('employee', res);
  //     this.employees = res;
  //     },
  //     error => console.log(error)
  //     );

  //   // this.hc.get(`http://test.aksharschoolsolutions.com:8080/SmartCardWS/services/EmployeeProfile/schoolCd/${data}`).subscribe(res =>{
  //   //   console.log('employee',res);

  //   //   alert('Search Done!');

  //   //   this.router.navigate(['/main/list_employee_fillter']);
  //   // });


  //     }

}
