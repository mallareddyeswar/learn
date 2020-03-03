import { Component, OnInit } from "@angular/core";
import { ApiService } from "./../../../api.service";
import { Router } from "@angular/router";
import { ExcelService } from "./../../../excel.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { element } from "protractor";
declare var $;

@Component({
  selector: "app-list-student",
  templateUrl: "./list-student.component.html",
  styleUrls: ["./list-student.component.css"]
})
export class ListStudentComponent implements OnInit {
  studentBlood: any;
  classroom: any;
  classSection: any;
  editClass: any;
  editSection: any;
  notiSingleStatus: boolean = false;
  notiStatus: boolean = false;
  deleteStu: boolean = false;
  // tslint:disable-next-line: max-line-length
  constructor(
    private apiService: ApiService,
    private router: Router,
    private excelservice: ExcelService,
    private formBuilder: FormBuilder,
    private route: Router,
  ) {


  }


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
    this.classDropdown(schId);
    this.apiService.studentBloodGroup().subscribe(res => {
      this.studentBlood = res;
    });
    let searchObj = {
      schoolCd: localStorage.getItem("schoolCd"),
      classroom: localStorage.getItem("classroom"),
      section: localStorage.getItem("Section"),

    }
    console.log(searchObj, "searchObj")
    if ((searchObj.classroom != null || searchObj.classroom != undefined) && (searchObj.section != null || searchObj.section != undefined)) {
      this.searchRes(searchObj)
    } else {
      this.getSchoolList(schId);
    }
  }

  getSchoolList(param) {
    this.apiService.postStudentSearch(param).subscribe(res => {
      if (res == null) {
        this.errorShow = true;
      } else {
        this.students = res;


      }
    });
  }



  classDropdown(data) {
    this.apiService.classDropdown(data).subscribe(res => {
      this.classroom = res;
      console.log(res, "classDropdown");
    });
  }

  onChangeClass(data) {
    let schoolCd = this.schoolCd;
    this.apiService.sectionDropdown(schoolCd, data).subscribe(res => {
      this.classSection = res;


    });
  }
  editClassDropdown() {
    this.apiService.classDropdown(this.schoolCd).subscribe((result) => {
      this.editClass = result;
    });
  }

  editChangeClass(params) {
    this.apiService.sectionDropdown(this.schoolCd, params).subscribe(result => {
      this.editSection = result
    })
  }

  searchForm = this.formBuilder.group({
    classroom: [""],
    section: [""],

    schoolCd: localStorage.getItem("schoolCd")

  });

  onSearch() {
    console.log(this.searchForm.value, " Search Result");

    localStorage.setItem('classroom', this.searchForm.value.classroom);
    localStorage.setItem('Section', this.searchForm.value.section);
    this.searchRes(this.searchForm.value)
  }

  searchRes(data) {
    this.apiService
      .studentSearchByfield(data)
      .subscribe(res => {
        this.students = res;

      });
  }

  onSave(student: any) {
    this.apiService.updateStudent(student).subscribe(res => {
      $("#myModal").modal("hide");
      this.getSchoolList(this.schoolCd);
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
      if (res) {
        this.notiSingleStatus = true
        setTimeout(() => {
          this.notiSingleStatus = false
        }, 4000);

      }
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
        if (data) {
          this.deleteStu = true
          setTimeout(() => {
            this.deleteStu = false
          }, 4000);

        }
        this.getSchoolList(this.schoolCd);
      });
    }
  }
  selectedBoxes: any[] = [];

  selectedCheckbox(data) {
    this.selectedBoxes.push(data);
  }

  onButton(data: any) {

    if (this.isChecked == true) {

      let studObj = [];
      this.students.forEach(element => {
        delete element.checked;
        studObj.push(element);
      });
      studObj.forEach(ele => {
        ele.idCardStatus = data;
      });
      this.apiService.postStudentstatus(studObj).subscribe(res => {
        if (res) {

          this.notiStatus = true
          setTimeout(() => {
            this.notiStatus = false
          }, 4000);

        }
        location.reload();
        this.route.navigate(["/main/list_student"]);


      });
    } else {
      if (
        this.selectedBoxes === null ||
        this.selectedBoxes.length === 0 ||
        this.selectedBoxes == undefined
      ) {
        return `select a checkbox`;
      } else {
        let selectedObj: any[] = [];
        for (let items of this.selectedBoxes) {
          delete items.checked;
          items.idCardStatus = data;
          selectedObj.push(items);

        }

        this.apiService.postStudentstatus(selectedObj).subscribe(res => {
          if (res) {
            this.notiStatus = true;
            setTimeout(() => {
              this.notiStatus = false;
            }, 4000);
          }
          location.reload();
          this.route.navigate(["/main/list_student"]);




        });
      }

    }

  }








  CheckAllOptions() {
    if (
      this.students.every((val: { checked: boolean }) => val.checked == true)
    ) {
      this.students.forEach((val: { checked: boolean }) => {
        val.checked = false;
        this.isChecked = false;
      });
    } else {
      this.students.forEach((val: { checked: boolean }) => {
        val.checked = true;
        this.isChecked = true;
      });
    }
  }


}