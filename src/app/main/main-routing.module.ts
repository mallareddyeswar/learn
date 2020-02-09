import { StudentComponent } from './student/student.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { ListSchoolComponent } from './school/list-school/list-school.component';
import { AddSchoolComponent } from './school/add-school/add-school.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { ListStudentComponent } from './student/list-student/list-student.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ListSchoolComponent
      },
      {
        path: 'add_school',
        component: AddSchoolComponent
      },
      {
        path: 'list_student',
        component: ListStudentComponent
      },
      {
        path: 'add_student',
        component: AddStudentComponent
      },
      {
        path: 'add_employee',
        component: AddEmployeeComponent
      },
      {
        path: 'list_employee',
        component: ListEmployeeComponent

      },
      // {
      //   path: 'list_employee_fillter',
      //   component: ListEmployeeComponent

      // },

      {
        path: 'add_admin',
        component: AddAdminComponent
      },
      {
        path: 'list_admin',
        component: ListAdminComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
