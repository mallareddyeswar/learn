import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { SchoolComponent } from "./school/school.component";
import { StudentComponent } from "./student/student.component";
import { EmployeeComponent } from "./employee/employee.component";
import { AddSchoolComponent } from "./school/add-school/add-school.component";
import { ListSchoolComponent } from "./school/list-school/list-school.component";
import { AddStudentComponent } from "./student/add-student/add-student.component";
import { ListStudentComponent } from "./student/list-student/list-student.component";
import { AddEmployeeComponent } from "./employee/add-employee/add-employee.component";
import { ListEmployeeComponent } from "./employee/list-employee/list-employee.component";
import { AdminComponent } from "./admin/admin.component";
import { AddAdminComponent } from "./admin/add-admin/add-admin.component";
import { ListAdminComponent } from "./admin/list-admin/list-admin.component";
import { TableFilterPipe } from "./table-filter.pipe";
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    MainComponent,
    SchoolComponent,
    StudentComponent,
    EmployeeComponent,
    AddSchoolComponent,
    ListSchoolComponent,
    AddStudentComponent,
    ListStudentComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    AdminComponent,
    AddAdminComponent,
    ListAdminComponent,
    TableFilterPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule, MatIconModule,
  ],
  providers: []
})
export class MainModule { }
