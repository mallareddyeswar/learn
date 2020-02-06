import { ApiService } from './../../../api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

//    employees = [
//     {"id":1,"name":"Licensed Frozen Hat","description":"Incidunt et magni","price":"170.00","quantity":56840},
//     {"id":2,"name":"Rustic Concrete Chicken","description":"Sint libero mollitia","price":"302.00","quantity":9358},
//     {"id":3,"name":"Fantastic Metal Computer","description":"In consequuntur cupiditat","price":"279.00","quantity":90316},
//     {"id":4,"name":"Refined Concrete Chair","description":"Saepe nemo praesentium","price":"760.00","quantity":5899}
// ];
  employees: any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getEmployees().subscribe(
      data => {
       this.employees = data;
       console.log( this.employees );
      },
      error => console.log(error)
    );
  }

}
