import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";
import { StudentCoursesComponent } from "../components/student-courses/student-courses.component";
import { StudentsClassesComponent } from "../components/students-classes/students-classes.component";

@NgModule({
  declarations : [
    StudentCoursesComponent,
    StudentsClassesComponent,
    PageNotFoundComponent
  ]
})
export class StudentModule{}
