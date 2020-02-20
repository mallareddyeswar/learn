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
  students: any;
  errorShow: any;
  schoolCd: any = localStorage.getItem('schoolCd');

  // tslint:disable-next-line: max-line-length
  constructor(private apiService: ApiService , private router: Router, private excelservice: ExcelService) {


   }

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
    // photoLocation: this.fileToUpload,
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
  let studentObj:any[]=[];
  studentObj.push(student);
 console.log(studentObj)
  this.apiService.postStudentstatus(studentObj).subscribe(res => {
    
console.log(res[0] + 'updated')

 });



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




  // onSearch(data) {
  //   console.log(data);

  //   this.apiService.postStudentSearch(data).subscribe(res => {
  //     // console.log('employee', res);
  //     this.students = res;
  //   });
  // }

}

