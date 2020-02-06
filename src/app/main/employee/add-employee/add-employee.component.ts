import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ApiService } from './../../../api.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private apiService: ApiService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({

      employeeName: [''],
      qualification: [''],
      designation: [''],
      schoolCd: [''],
      dateOfJoining: [''],
      bloodGroup: [''],
      phoneNumber: [''],
      aadharNbr: [''],
      address: [''],


    });
  }
  onSubmit() {


    this.apiService.postEmployee(
      console.log(this.addForm.value)
      )



    }

}
