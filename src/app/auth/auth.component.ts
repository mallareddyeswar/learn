import { Component, OnInit } from '@angular/core';
import { ImportList } from './authmodel';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';

import { NgFlashMessageService } from 'ng-flash-messages';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error: any;
  constructor(private router: Router, private ls: LoginService, private ngFlashMessageService: NgFlashMessageService) {}
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


this.ngFlashMessageService.showFlashMessage({
  messages: [`Please check your phone for OTP`],
  type: 'success',

  dismissible: true,
});
this.hideAndShow();

    },
    error => {
      this.error = error;
      this.ngFlashMessageService.showFlashMessage({
        messages: [`This mobile number is not registered with us`],
        type: 'danger',

        dismissible: true,
      });


    }

    );

  }

  login(loginData) {
    this.ngFlashMessageService.showFlashMessage({
      messages: [`Successfully Logged In `],
      type: 'success',

      dismissible: true,
    });
    this.ls.login(loginData).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.authToken);
      this.router.navigate(['main']);
    });
    }





}
