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
 constructor(
 private formBuilder: FormBuilder,
 private apiService: ApiService
 ) {}

 ngOnInit() {
 this.addForm = this.formBuilder.group({
 employeeName: [' '],
 qualification: [' '],
 designation: [' '],
 schoolCd: [' '],
 dateOfJoining: [' '],
 bloodGroup: [''],
 phoneNumber: [''],
 aadharNbr: [''],
 address: ['']
 });

 this.apiService.getSchool().subscribe(
  data => {
   this.schools = data;
   console.log( this.schools );
  },
  error => console.log(error)
);

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
 });
 }
}
