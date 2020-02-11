import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../api.service';

@Component({
  selector: 'app-list-school',
  templateUrl: './list-school.component.html',
  styleUrls: ['./list-school.component.css']
})
export class ListSchoolComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  schools: any;
  ngOnInit() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
    this.apiService.getSchool().subscribe(
      data => {
       this.schools = data;
       console.log( this.schools );


      },
      error => console.log(error)
    );
  }


  deleteSchool(id: any): void {

    this.apiService.deleteSchool(id.schoolId)
      .subscribe( data => {
alert('School Deleted');

      });



  }

}
