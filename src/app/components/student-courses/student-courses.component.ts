import { Component, OnInit } from '@angular/core';
import { course } from 'src/app/models/course/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  constructor(private courseService : CourseService ) { }

  courses : course[] = []
  coursesToDisplay : course[]

  ngOnInit(): void {

    this.courseService.getStudentCourses(localStorage.getItem('userId')).subscribe(res => {
      this.courses = res;
      this.coursesToDisplay = res;
    })
    this.courses = this.courseService.courses;
  }

  onSearch(event){
    this.coursesToDisplay = this.courses.filter(s => s.name.toLowerCase().includes(event.target.value) || s.name.toUpperCase().includes(event.target.value) )

  }

}
