import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { classModel } from 'src/app/models/class.model';
import { classesFromServer } from 'src/app/models/classes-from-server.model';
import { course } from 'src/app/models/course/course.model';
import { CourseClassService } from 'src/app/services/course-class.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-students-classes',
  templateUrl: './students-classes.component.html',
  styleUrls: ['./students-classes.component.css']
})
export class StudentsClassesComponent implements OnInit {

  Course : course
  courseId : number
  classId : number
  classes : classesFromServer[]
  classesModel : classModel[]
  isAddingReason : boolean = false
  reasonForAbseance : string = ''
  userId : string

  constructor(private route : ActivatedRoute , private classService : CourseClassService , private courseService : CourseService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    this.Course = {
      id : 1 ,
      name : 'Course',
      startingDate : new Date(),
      endingDate : new Date()
    }
    this.route.paramMap.subscribe(params => {
      this.courseId = Number.parseInt(params.get('id'))
      this.classService.getStudentCourseClasses(this.courseId,this.userId).subscribe(res =>{
        this.classesModel = res;
      })

      this.courseService.getCourse(Number.parseInt(params.get('id'))).subscribe(res => {
        this.Course = res
      })

    })
  }
  onYes(index:number){
    this.classId = this.classesModel[index].id
    this.classService.updateStudentAttendanceStatus(this.classId,this.userId,true,null).subscribe(res => {
      console.log(res)
    })
    this.classesModel[index].isStatusUpdated = true
    this.classesModel[index].isAttended = true

  }
  onNo(index:number){

    this.classId = this.classesModel[index].id
    this.isAddingReason = true
    this.classesModel[index].isStatusUpdated = true
    this.classesModel[index].isAttended = false
  }

  onExit(){
    this.isAddingReason = false
  }
  onSumitReason(){
    this.isAddingReason = false
    this.classService.updateStudentAttendanceStatus(this.classId,this.userId,false,this.reasonForAbseance).subscribe(res => {
      console.log(res)
    })
  }
}
