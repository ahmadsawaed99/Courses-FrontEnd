import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseClassService } from 'src/app/services/course-class.service';
import { CourseService } from 'src/app/services/course.service';
import { classModel } from 'src/app/models/class.model';
import { classesFromServer } from 'src/app/models/classes-from-server.model';
import { course } from 'src/app/models/course/course.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  Course : course
  courseId : number
  classes : classesFromServer[]
  classesModel : classModel[]
  constructor(private route : ActivatedRoute , private classService : CourseClassService , private courseService : CourseService) { }

  ngOnInit(): void {
    this.Course = {
      id : 1 ,
      name : 'Course',
      startingDate : new Date(),
      endingDate : new Date()
    }
    this.route.paramMap.subscribe(params => {
      this.courseId = Number.parseInt(params.get('id'))
      this.classService.getCourseClasses(this.courseId).subscribe(res =>{
        this.classesModel = res;
      })

      this.courseService.getCourse(Number.parseInt(params.get('id'))).subscribe(res => {
        this.Course = res
      })

    })
  }

}
