import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }
  schoolDrop;
  schools: object;
  studentForm: FormGroup;
  schoolCd: any = localStorage.getItem('schoolCd');


fileToUpload: File;

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      admissionNumber: [''],
      studentName: [''],
      classroom: [''],
      section: [''],
      // schoolCd: this.schoolDrop,
      bloodGroup: [''],
      dateOfBirth: [''],
      aadharNbr: [''],
      gender: [''],
      idCardStatus: [''],
      phoneNumber: [''],
      photoLocation: this.fileToUpload,
      address: [''],
      rollNbr: [''],
      parentName: [''],
      houseName: [''],
      schoolCd : this.schoolCd,




    });



    // this.apiService.getSchool().subscribe(
    //   data => {
    //    this.schools = data;
    //    console.log( this.schools );
    //   },
    //   error => console.log(error)
    // );

  }

  onSelect(data) {
// this.schoolDrop = data;
this.studentForm.patchValue({
  schoolCd : data,

});
// console.log('"School Dropdown"', this.schoolDrop);
}


handleFileInput(files: FileList) {

  this.fileToUpload = files.item(0);
  console.log(this.fileToUpload);


}





  onSubmit() {
// console.log(this.studentForm.value);

 this.apiService.postStudent(this.studentForm.value).subscribe((res) => {

    alert('Student added successfully');
    location.reload();
    });
   }

}
