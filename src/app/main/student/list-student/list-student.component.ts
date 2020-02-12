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
  constructor(private apiService: ApiService , private router: Router, private excelservice: ExcelService) { }

  ngOnInit() {

  }


onPrint(data, student) {


  student.studentProfileId = data;
  console.log(student);
//   this.apiService.postStudentstatus(student).subscribe(res=>{
//    alert("Student ID Card Updated");


//  });



}




downloadExcel(): void {
  this.excelservice.exportAsExcelFile(this.students, 'Student_list');
}

  onSearch(data) {
    console.log(data);

    this.apiService.postStudentSearch(data).subscribe(res => {
      // console.log('employee', res);
      this.students = res;
    });
  }

}

