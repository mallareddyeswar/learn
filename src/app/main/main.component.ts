import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadavg } from 'os';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  navigate: any;
  constructor(private router: Router ) {

   }

  ngOnInit() {


  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }


}
