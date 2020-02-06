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
    this.apiService.getSchool().subscribe(
      data => {
       this.schools = data;
       console.log( this.schools );
      },
      error => console.log(error)
    );
  }

}
