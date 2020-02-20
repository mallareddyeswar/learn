import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../../api.service';

@Component({
 selector: 'app-add-employee',
 templateUrl: './add-employee.component.html',
 styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
 addForm: FormGroup;
  schools: object;
  employees: any;
  schoolCd: any = localStorage.getItem('schoolCd');

 constructor(
 private formBuilder: FormBuilder,
 private apiService: ApiService
 ) {}

 ngOnInit() {
 this.addForm = this.formBuilder.group({
 employeeName: [' '],
 admissionNumber: [''],
 qualification: [' '],
 designation: [' '],
//  schoolCd: [' '],
 dateOfJoining: [' '],
 dateOfBirth: [''],
 bloodGroup: [''],
 phoneNumber: [''],
 email: [],
 aadharNbr: [''],
 address: [''],
 idCardStatus: [''],
 schoolCd : this.schoolCd,
 });

//  this.apiService.getSchool().subscribe(
//   data => {
//    this.schools = data;
//    console.log( this.schools );
//   },
//   error => console.log(error)
// );

//  const schId = localStorage.getItem('schoolCd');
//  console.log(schId);
//  this.apiService.postEmployeeSearch(schId.schoolCd).subscribe(res => {
//   console.log('employee', res);
//   this.employees = res;
// });

 }


 onSelect(data) {
  // this.schoolDrop = data;
  this.addForm.patchValue({
    schoolCd : data,

  });
  // console.log('"School Dropdown"', this.schoolDrop);
  }

 onSubmit() {
 this.apiService.postEmployee(this.addForm.value).subscribe(res => {
 alert('Employee added successfully');
 location.reload();
 });
 }
}
