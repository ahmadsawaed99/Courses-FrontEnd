import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './components/students/students.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CourseStudentsComponent } from './components/course-students/course-students.component';
import { ClassesComponent } from './components/classes/classes.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { UserResolver } from './components/students/user.resolver';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './services/auth.guard';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { CoursesResolver } from './components/courses/courses.resolver';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StudentsClassesComponent } from './components/students-classes/students-classes.component';
import { EditProfileComponent } from './forms/edit-profile/edit-profile.component';
import { ProfileResolver } from './forms/edit-profile/profile.resolver';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';

const routes: Routes = [
  { path: 'students', component: StudentsComponent , resolve : {students : UserResolver} , canActivate:[AuthGuard]},
  { path: 'user/edit', component: EditProfileComponent ,resolve : { user : ProfileResolver} ,canActivate:[AuthGuard]},
  { path: 'user/change-password', component: ChangePasswordComponent,canActivate:[AuthGuard]},
  { path: 'courses', component: CoursesComponent , resolve :{courses : CoursesResolver}, canActivate:[AuthGuard]},
  { path: 'course/:id/students', component: CourseStudentsComponent , canActivate:[AuthGuard]},
  { path: 'course/:id/classes', component: ClassesComponent , canActivate:[AuthGuard]},
  { path: 'class/:id/attendance-report', component: AttendanceReportComponent , canActivate:[AuthGuard]},
  { path: 'login', component: AuthComponent},
  { path: 'user/courses', component: StudentCoursesComponent , canActivate:[AuthGuard]},
  {path: 'home' , component:HomeComponent , canActivate:[AuthGuard]},
  {path: 'student/course/:id/classes' , component:StudentsClassesComponent , canActivate:[AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,MatDatepickerModule ]
})
export class AppRoutingModule { }
