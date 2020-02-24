import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../api.service';
import {Router} from '@angular/router';
import {ExcelService} from './../../../excel.service';




@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private apiService: ApiService , private router: Router, private excelservice: ExcelService) {
  }




   fileToUpload: File;
   searchText: any;
  students: any;
  errorShow: any;
  schoolCd: any = localStorage.getItem('schoolCd');

   updateForm: any = {
    admissionNumber: '',
    studentName: '',
    classroom: '',
    section: '',
    // schoolCd: this.schoolDrop,
    bloodGroup: '',
    aadharNbr: '',
    dateOfBirth: '',
    schoolCd : this.schoolCd,

    phoneNumber: '',
    photoLocation: this.fileToUpload,
    address: '',
    rollNbr: '',
    parentName: '',
    houseName: '',





  };


  ngOnInit() {


    const schId = localStorage.getItem('schoolCd');
    console.log(schId);
    this.apiService.postStudentSearch(schId).subscribe(res => {
      if (res == null) {
        this.errorShow = true;
      } else {
        this.students = res;
        console.log(this.students);
      }
    });
  }

  onSave(student) {

    this.apiService.updateStudent(student).subscribe(res => {
      console.log(res + 'Updated Your Student');
      location.reload();
    });
  }
  editStudent(id: any) {
    this.updateForm = id;
    console.log(this.updateForm);
  }


onPrint(data, student) {
console.log(student);

student.idCardStatus = data;
const studentObj: any[] = [];
studentObj.push(student);
console.log(studentObj);
this.apiService.postStudentstatus(studentObj).subscribe(res => {

console.log(res[0] + 'updated');

 });



}




checkBox(data) {
  console.log(data, 'check box');
}




downloadExcel(): void {
  this.excelservice.exportAsExcelFile(this.students, 'Student_list');
}


deleteStundent(id: any): void {
  // console.log('Delete School' + id.schoolId );
  if (window.confirm('Are you sure, you want to delete?')) {
    this.apiService.deleteStudent(id.studentProfileId).subscribe(data => {
      alert('Student Deleted');
      location.reload();
    });
  }
}

CheckAllOptions() {
  if (this.students.every(val => val.checked === true)) {
    this.students.forEach(val => { val.checked = false; });

  } else {
    this.students.forEach(val => { val.checked = true; });
    console.log(this.students, ' check box');
  }
}

// handleFileInput(files: FileList) {

//   this.fileToUpload = files.item(0);
//   console.log(this.fileToUpload);


// }


  // onSearch(data) {
  //   console.log(data);

  //   this.apiService.postStudentSearch(data).subscribe(res => {
  //     // console.log('employee', res);
  //     this.students = res;
  //   });
  // }

}

