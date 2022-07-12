import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { course } from 'src/app/models/course/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses : course[] = []
  coursesToDisplay : course[]

  isAddingNewCourse = false

  constructor(private courseService:CourseService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    // this.courseService.getCourses().subscribe(res => {
    //   this.courses = res;
    //   this.coursesToDisplay = res;
    // })
    // this.courses = this.courseService.courses;

    this.courses = this.route.snapshot.data['courses']
    this.coursesToDisplay = this.route.snapshot.data['courses']
  }
  onDelete(index){


    this.courseService.deleteCourse(this.courses[index].id).subscribe(res => console.log(res));
    console.log(this.courses[index].id)
    if(index === 0){
      this.courses.shift()

    }
    else{
      this.courses.splice(index,index);
    }

  }

  onSearch(event){
    this.coursesToDisplay = this.courses.filter(s => s.name.toLowerCase().includes(event.target.value) || s.name.toUpperCase().includes(event.target.value) )

  }

  onAddCourse(){
    this.isAddingNewCourse = true
  }

  onCloseAddCourseForm(){
    this.isAddingNewCourse = false
  }
  AddCourse(event : course){

    this.courses.push(event)
    this.isAddingNewCourse = false

  }

  convertDateToString(date : Date) :string{
    return date.toDateString()
  }

}
