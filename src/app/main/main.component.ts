import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadavg } from 'os';
import { DataService } from './../main/data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  navigate: any;
  constructor(private router: Router, public ds: DataService ) {

   }


  ngOnInit() {


  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    localStorage.removeItem('showItems');

  }




}
