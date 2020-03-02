import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "./../../../api.service";
import { Router } from "@angular/router";
import { error } from "protractor";

@Component({
  selector: "app-add-school",
  templateUrl: "./add-school.component.html",
  styleUrls: ["./add-school.component.css"]
})
export class AddSchoolComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }

  schoolForm: FormGroup;
  addSchoolnoti = false;
  manAlert = false;
  ngOnInit() {
    this.schoolForm = this.formBuilder.group({
      schoolCd: ["", Validators.required],
      schoolName: ["", Validators.required],
      educationBoard: [""],
      address: [""],
      registrationNumber: [""],
      contactPersonName: ["", Validators.required],
      correspondantName: [""],
      phoneNumber: ["", Validators.required],
      emailId: [""]
    });
  }

  onSubmit() {
    if (this.schoolForm.invalid) {
      this.manAlert = true
      setTimeout(() => {
        this.manAlert = false
      }, 4000);

      return;
    } else {
      console.log("before component", this.schoolForm.value);
      this.apiService.postSchool(this.schoolForm.value).subscribe(res => {

        if (res) {
          this.addSchoolnoti = true
          setTimeout(() => {
            this.addSchoolnoti = false
          }, 4000);

        }
        this.schoolForm.reset();


      });
    }
  }
}
