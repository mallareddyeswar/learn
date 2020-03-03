import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadavg } from 'os';
import { DataService } from './../main/data.service';

import { ApiService } from '../api.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  navigate: any;
  param: any;
  constructor(private router: Router, public ds: DataService, private apiService: ApiService) {


  }


  ngOnInit() {


    this.tokenExpire();
    this.removeToken();




  }

  removeToken() {
    setTimeout(function () {
      let token = localStorage.getItem("token")
      localStorage.removeItem('token');
      localStorage.removeItem('schoolCd');
      localStorage.removeItem('Section');
      localStorage.removeItem('classroom');
      location.reload();
      this.router.navigate(['']);

    }, 3600000);

  }

  tokenExpire() {
    let token = localStorage.getItem("token")
    if (token == null) {
      this.router.navigate(['']);


    }
  }





  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('schoolCd');
    localStorage.removeItem('Section');
    localStorage.removeItem('classroom');
    localStorage.removeItem('showItems');
    this.router.navigate(['']);



  }




}
