import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  students: any;
  constructor(private apiService: ApiService , private router: Router) { }

  ngOnInit() {
   
  }
  

onPrint(data) {
  
  console.log("the selected value is " + data);
  
}

viewDetails(id){
  this.apiService.postStudentstatus(id).subscribe();
    

}

  onSearch(data) {
    // console.log(data);

    this.apiService.postStudentSearch(data).subscribe(res => {
      // console.log('employee', res);
      this.students = res;
    });
  }
 
}

