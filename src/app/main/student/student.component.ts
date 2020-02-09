import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor( private apiService: ApiService) { }
  studentdata: any;
  ngOnInit() {
  }

  onSearch(studentdata) {
    // console.log(data);

    this.apiService.postStudentSearch(studentdata).subscribe(res => {
      console.log('Student', res);
      });

}
}
