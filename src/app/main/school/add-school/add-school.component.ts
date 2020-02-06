import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from './../../../api.service';
import {Router} from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;



  ngOnInit() {
    this.addForm = this.formBuilder.group({

      schoolCd: [''],
      schoolName: [''],
      educationBoard: [''],
      address: [''],
      registrationNumber: [''],
      personName: [''],
      correspondantName: [''],
      phoneNumber: [''],
      email: [''],

    });
  }
  onSubmit() {


    this.apiService.postSchool(
      this.addForm.value
      )
      .subscribe( result => console.log(result),
      // tslint:disable-next-line: no-shadowed-variable
      error => console.log(error)
        );


    }

}
