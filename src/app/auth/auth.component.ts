import { Component, OnInit } from '@angular/core';
import { ImportList } from './authmodel';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private router: Router, private ls: LoginService) {}
  hide = true;
  show = false;
  mobileNumber = { mobileNumber: '' };

  ngOnInit() {}

  hideAndShow() {
    return (this.hide = false), (this.show = true);
  }

  getOTP(data) {
    this.mobileNumber = data.value;
    // once get token add the token
    this.ls.getOTP(data.value).subscribe(res => {
      // localStorage.setItem("token", res["token"]);
    });
  }

  login(loginData) {
    this.ls.login(loginData).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.authToken);
      this.router.navigate(['main']);
    });
    }





}
