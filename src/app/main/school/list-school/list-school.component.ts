import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../api.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { DataService } from './../../../main/data.service';
declare var $;

@Component({
  selector: 'app-list-school',
  templateUrl: './list-school.component.html',
  styleUrls: ['./list-school.component.css']
})
export class ListSchoolComponent implements OnInit {


  // tslint:disable-next-line: max-line-length
  constructor(
    private apiService: ApiService,
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router,
    private data: DataService,
  ) {

  }
  deleteSchoolNoti = false;
  errorShow: any;
  updateForm: any = {

    schoolCd: '',
    schoolName: '',
    educationBoard: '',
    address: '',
    registrationNumber: '',
    contactPersonName: '',
    correspondantName: '',
    phoneNumber: '',
    emailId: '',
    status: ''
  };
  schools: any;
  error: any;
  students: any;
  newStudent: any[];
  message: any;

  isShown = false; // hidden by default

  ngOnInit() {

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }

    this.getSchool(this.schools);
  }

  getSchool(parms) {

    this.apiService.getSchool().subscribe(data => {


      if (data == null) {
        this.errorShow = true;

      } else {
        this.schools = data;
        console.log(this.schools);
      }
    });
  }

  deleteSchool(id: any): void {
    // console.log('Delete School' + id.schoolId );
    if (window.confirm('Are you sure, you want to delete?')) {
      this.apiService.deleteSchool(id.schoolId).subscribe(data => {
        if (data) {
          this.deleteSchoolNoti = true
          setTimeout(() => {
            this.deleteSchoolNoti = false
          }, 4000);

        }
        this.getSchool(this.schools);
      });
    }
  }

  editSchool(id: any) {
    this.updateForm = id;
    console.log(this.updateForm);
  }

  onSave(data) {
    // console.log(data, 'console school');
    this.apiService.updateSchool(data).subscribe(res => {
      $("#myModal").modal("hide");
      this.getSchool(this.schools);
    });
  }

  selectSchool(id: any) {
    localStorage.setItem('schoolCd', id.schoolCd);
    this.router.navigate(['/main/list_student']);
    localStorage.setItem('showItems', 'showMenu');



  }

























}





