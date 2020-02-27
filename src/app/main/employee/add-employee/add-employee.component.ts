import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "./../../../api.service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"]
})
export class AddEmployeeComponent implements OnInit {
  addForm: FormGroup;
  schools: object;
  employees: any;
  schoolCd: any = localStorage.getItem("schoolCd");
  designation: any;
  bloodGroup: any;
  qualification: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      admissionNumber: [""],
      employeeName: ["", Validators.required],
      qualification: [""],
      designation: [""],
      //  schoolCd: [' '],
      dateOfJoining: [""],
      dateOfBirth: [""],
      bloodGroup: [""],
      phoneNumber: [""],
      email: [],
      aadharNbr: ["", Validators.maxLength(12)],
      address: [""],
      idCardStatus: [""],
      schoolCd: this.schoolCd
    });

    this.apiService.designation().subscribe(res => {
      this.designation = res;
    });

    this.apiService.bloodGroup().subscribe(res => {
      this.bloodGroup = res;
    });

    this.apiService.qualification().subscribe(res => {
      this.qualification = res;
    });
  }

  onSelect(data) {
    this.addForm.patchValue({
      schoolCd: data
    });
  }

  onSubmit() {
    console.log(this.addForm.status);
    console.log(this.addForm.value["employeeName"]);
    console.log(this.addForm.value);

    if (
      this.addForm.value["employeeName"] == null ||
      this.addForm.value["employeeName"] == undefined ||
      this.addForm.value["employeeName"] == "" ||
      this.addForm.invalid
    ) {
      alert("Please Enter All (*)Mandatory Fields");
      return;
    } else {
      this.apiService.postEmployee(this.addForm.value).subscribe(res => {
        alert("Employee added successfully");
        location.reload();
      });
    }
  }
}
