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

  schoolForm: FormGroup;



  ngOnInit() {
    this.schoolForm = this.formBuilder.group({

      schoolCd: [''],
      schoolName: [''],
      educationBoard: [''],
      address: [''],
    registrationNumber: [''],
    contactPersonName: [''],
    correspondantName: [''],
    phoneNumber: [''],
    emailId: [''],

  });
}



  onSubmit() {
    console.log('before component', this.schoolForm.value);
    this.apiService.postSchool(this.schoolForm.value).subscribe((res) => {


      console.log('after component', this.schoolForm.value);

      alert('School added successfully');
      location.reload();

    });
    }

}