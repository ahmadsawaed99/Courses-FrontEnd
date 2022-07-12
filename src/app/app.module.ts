import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StudentsComponent } from './components/students/students.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/course/course.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import { AddStudentFormComponent } from './forms/add-course-form/add-student-form/add-student-form.component';
import { AddCourseFormComponent } from './forms/add-course-form/add-course-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FooterComponent } from './components/footer/footer.component';
import { CourseStudentsComponent } from './components/course-students/course-students.component';
import { AddStudentToCourseComponent } from './components/add-student-to-course/add-student-to-course.component';
import { ClassesComponent } from './components/classes/classes.component';
import { DatePipe } from '@angular/common';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { AuthComponent } from './auth/auth/auth.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';
import { EditProfileComponent } from './forms/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsComponent,
    HomeComponent,
    CoursesComponent,
    CourseComponent,
    AddStudentFormComponent,
    AddCourseFormComponent,
    FooterComponent,
    CourseStudentsComponent,
    AddStudentToCourseComponent,
    ClassesComponent,
    AttendanceReportComponent,
    AuthComponent,
    PageNotFoundComponent,
    EditProfileComponent,
    ChangePasswordComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,

  ],
  providers: [
    BrowserModule,
    DatePipe,
    AuthGuard,
    {provide : HTTP_INTERCEPTORS , useClass : TokenInterceptorService , multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
