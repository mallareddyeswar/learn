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
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      admissionNumber: [''],
      employeeName: [' ', Validators.required],
      qualification: [' ', Validators.required],
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
      schoolCd: this.schoolCd,
    });

  }


  onSelect(data) {

    this.addForm.patchValue({
      schoolCd: data,

    });

  }

  onSubmit() {
    if (this.addForm.invalid) {
      alert("Please Enter All (*)Mandatory Fields");
      return
    } else {
      this.apiService.postEmployee(this.addForm.value).subscribe(res => {
        alert('Employee added successfully');
        location.reload();
      });
    }
  }
}
