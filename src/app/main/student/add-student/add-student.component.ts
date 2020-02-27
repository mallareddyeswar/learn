import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { ApiService } from "src/app/api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"]
})
export class AddStudentComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }
  classroom: any;
  classSection: any;
  schoolDrop;
  schools: object;
  studentForm: FormGroup;
  schoolCd: any = localStorage.getItem("schoolCd");

  // fileToUpload: File;

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      admissionNumber: [""],
      studentName: ["", Validators.required],
      classroom: ["", Validators.required],
      section: ["", Validators.required],
      // schoolCd: this.schoolDrop,
      bloodGroup: [""],
      dateOfBirth: [""],
      aadharNbr: [""],
      gender: [""],
      idCardStatus: [""],
      phoneNumber: [""],
      // photoLocation: this.fileToUpload,
      address: [""],
      rollNbr: [""],
      parentName: [""],
      houseName: [""],
      schoolCd: this.schoolCd
    });

    this.classDropdown(this.schoolCd);
  }


  classDropdown(data) {
    this.apiService.classDropdown(data).subscribe(res => {
      this.classroom = res;
      console.log(res, 'classDropdown');
    })
  }

  onChangeClass(data) {
    let schoolCd = this.schoolCd;
    this.apiService.sectionDropdown(schoolCd, data).subscribe(res => {
      this.classSection = res;
    })


  }

  onSelect(data) {
    // this.schoolDrop = data;
    this.studentForm.patchValue({
      schoolCd: data
    });
    // console.log('"School Dropdown"', this.schoolDrop);
  }

  // handleFileInput(files: FileList) {

  //   this.fileToUpload = files.item(0);
  //   console.log(this.fileToUpload);

  // }

  onSubmit() {
    // console.log(this.studentForm.value);
    if (this.studentForm.invalid) {
      alert("Please Enter All (*)Mandatory Fields");
      return
    } else {
      this.apiService.postStudent(this.studentForm.value).subscribe(res => {
        alert("Student added successfully");
        location.reload();
      });
    }



  }
}
