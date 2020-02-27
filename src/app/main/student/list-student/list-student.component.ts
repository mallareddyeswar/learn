import { Component, OnInit } from "@angular/core";
import { ApiService } from "./../../../api.service";
import { Router } from "@angular/router";
import { ExcelService } from "./../../../excel.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { element } from 'protractor';

@Component({
  selector: "app-list-student",
  templateUrl: "./list-student.component.html",
  styleUrls: ["./list-student.component.css"]
})
export class ListStudentComponent implements OnInit {
  classroom: any;
  classSection: any;
  // tslint:disable-next-line: max-line-length
  constructor(
    private apiService: ApiService,
    private router: Router,
    private excelservice: ExcelService,
    private formBuilder: FormBuilder
  ) { }



  isChecked;
  searchText: any;
  students: any;
  errorShow: any;
  schoolCd: any = localStorage.getItem("schoolCd");

  updateForm: any = {
    admissionNumber: "",
    studentName: "",
    classroom: "",
    section: "",
    // schoolCd: this.schoolDrop,
    bloodGroup: "",
    aadharNbr: "",
    dateOfBirth: "",
    schoolCd: this.schoolCd,

    phoneNumber: "",

    address: "",
    rollNbr: "",
    parentName: "",
    houseName: ""
  };

  ngOnInit() {

    const schId = localStorage.getItem("schoolCd");
    console.log(schId);
    this.apiService.postStudentSearch(schId).subscribe(res => {
      if (res == null) {
        this.errorShow = true;
      } else {
        this.students = res;
        console.log(this.students, ' student ');

      }
    });

    this.classDropdown(schId);

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





  searchForm = this.formBuilder.group({
    classroom: [""],
    section: [""],
    schoolCd: localStorage.getItem("schoolCd")
  });

  onSearch() {
    console.log(this.searchForm.value, " Search Result");
    this.apiService
      .studentSearchByfield(this.searchForm.value)
      .subscribe(res => {
        this.students = res;

      });
  }

  onSave(student: any) {
    this.apiService.updateStudent(student).subscribe(res => {
      console.log(res + "Updated Your Student");
      location.reload();
    });
  }
  editStudent(id: any) {
    this.updateForm = id;

  }

  onPrint(data: any, student: { idCardStatus: any }) {


    student.idCardStatus = data;
    const studentObj: any[] = [];
    studentObj.push(student);
    console.log(studentObj);
    this.apiService.postStudentstatus(studentObj).subscribe(res => {

    });
  }

  checkBox(data: any) {
    console.log(data, "check box");
  }

  downloadExcel(): void {
    this.excelservice.exportAsExcelFile(this.students, "Student_list");
  }

  deleteStundent(id: any): void {
    // console.log('Delete School' + id.schoolId );
    if (window.confirm("Are you sure, you want to delete?")) {
      this.apiService.deleteStudent(id.studentProfileId).subscribe(data => {
        alert("Student Deleted");
        location.reload();
      });
    }
  }


  onButton(data: any) {
    if (this.isChecked == true) {
      let studObj = []
      this.students.forEach(element => {
        delete element.checked
        studObj.push(element);
      })
      studObj.forEach((ele) => {
        ele.idCardStatus = data
      })
      this.apiService.postStudentstatus(studObj).subscribe(res => {
        alert(`All Student Id Card Status Updated Successfully`);
      });
    }
  }

  CheckAllOptions() {
    if (
      this.students.every((val: { checked: boolean }) => val.checked == true)
    ) {
      this.students.forEach((val: { checked: boolean }) => {
        val.checked = false;
        this.isChecked = false
      });
    } else {
      this.students.forEach((val: { checked: boolean }) => {
        val.checked = true;
        this.isChecked = true
      });
    }
  }

}
