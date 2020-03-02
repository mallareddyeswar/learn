import { ApiService } from "./../../../api.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ExcelService } from "./../../../excel.service";
declare var $;
@Component({
  selector: "app-list-employee",
  templateUrl: "./list-employee.component.html",
  styleUrls: ["./list-employee.component.css"]
})
export class ListEmployeeComponent implements OnInit {

  employees: any;
  isChecked: any;
  errorShow: any;
  schoolCd: any = localStorage.getItem("schoolCd");
  notiSingleStatus: boolean = false;
  notiStatus: boolean = false;
  empDelete: boolean = false;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private excelservice: ExcelService,
    private route: Router,
  ) { }
  designation: any;
  bloodGroup: any;
  qualification: any;

  updateForm: any = {
    employeeName: "",
    admissionNumber: "",
    qualification: "",
    designation: "",
    //  schoolCd: ' ',
    dateOfJoining: "",
    dateOfBirth: "",
    bloodGroup: "",
    phoneNumber: "",
    email: "",
    aadharNbr: "",
    address: "",
    idCardStatus: "",
    schoolCd: this.schoolCd
  };

  ngOnInit() {
    const schId = localStorage.getItem("schoolCd");
    console.log(schId);
    this.getEmployee(schId);

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
  getEmployee(parms) {
    this.apiService.postEmployeeSearch(parms).subscribe(res => {
      if (res == null) {
        this.errorShow = true;

      } else {
        console.log("employee", res);
        this.employees = res;
      }
    });
  }

  deleteEmployee(id: any): void {
    // console.log('Delete School' + id.schoolId );
    if (window.confirm("Are you sure, you want to delete?")) {
      this.apiService.deleteEmployee(id.employeeProfileId).subscribe(data => {
        if (data) {
          this.empDelete = true
          setTimeout(() => {
            this.empDelete = false
          }, 4000);

        }
        this.getEmployee(this.schoolCd)
      });
    }
  }

  downloadExcel(): void {
    this.excelservice.exportAsExcelFile(this.employees, "employees_list");
  }

  onPrint(data, employee) {
    console.log(employee);

    employee.idCardStatus = data;
    const employeeObj: any[] = [];
    employeeObj.push(employee);
    console.log(employeeObj);
    this.apiService.postEmpolyeestatus(employeeObj).subscribe(res => {
      if (res) {
        this.notiSingleStatus = true
        setTimeout(() => {
          this.notiSingleStatus = false
        }, 4000);

      }
    });
  }

  selectedBoxes: any[] = [];

  selectedCheckbox(data) {
    this.selectedBoxes.push(data);
  }


  onButton(data, employees) {
    if (this.isChecked == true) {
      let employObj = []
      this.employees.forEach(element => {
        delete element.checked
        employObj.push(element);
      })
      employObj.forEach((ele) => {
        ele.idCardStatus = data
      })
      this.apiService.postEmpolyeestatus(employObj).subscribe(res => {
        if (res) {

          this.notiStatus = true
          setTimeout(() => {
            this.notiStatus = false
          }, 4000);

        }

        // this.route.navigate(["list_employee"]);
        location.reload();
        this.getEmployee(this.schoolCd)

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

        this.apiService.postEmpolyeestatus(selectedObj).subscribe(res => {
          if (res) {
            this.notiStatus = true;
            setTimeout(() => {
              this.notiStatus = false;
            }, 4000);
          }
          location.reload();
          this.getEmployee(this.schoolCd)
        });
      }

    }
  }

  CheckAllOptions() {
    if (this.employees.every(val => val.checked === true)) {
      this.employees.forEach(val => {
        val.checked = false;
        this.isChecked = false
      });
    } else {
      this.employees.forEach(val => {
        val.checked = true;
        this.isChecked = true
      });
      console.log(this.employees, " check box");
    }
  }

  onSave(employee) {
    this.apiService.updateEmpolyee(employee).subscribe(res => {
      console.log(res, " empolyee update");

      $("#myModal").modal("hide");
      this.getEmployee(this.schoolCd)
    });
  }
  editStudent(id: any) {
    this.updateForm = id;
    console.log(this.updateForm);
  }

}
