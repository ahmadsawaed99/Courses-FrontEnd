import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { course } from 'src/app/models/course/course.model';
import { student } from 'src/app/models/student/student.model';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.css']
})
export class CourseStudentsComponent implements OnInit {

  Course : course
  students : student[] = []
  studentsToDisplay : student[] = []
  courseId : number
  isAddingStudent : boolean = false
  constructor( private route : ActivatedRoute , private courseService : CourseService) { }

  ngOnInit(): void {
    this.Course = {
      id : 1 ,
      name : 'Course',
      startingDate : new Date(),
      endingDate : new Date()
    }
    this.students = []
    this.route.paramMap.subscribe(params => {
      this.courseId = Number.parseInt(params.get('id'))
      this.courseService.getCourseStudents(Number.parseInt(params.get('id'))).subscribe(res =>{
        this.students = res;
        this.studentsToDisplay = res;
      })
      // this.courseName = this.courseService.courses[Number.parseInt(params.get('id'))].name;
      this.courseService.getCourse(Number.parseInt(params.get('id'))).subscribe(res => {
        this.Course = res
      })
    })


  }

  onSearch(event){
    this.studentsToDisplay = this.students.filter(s => s.firstName.includes(event.target.value))
  }

  onDelete(index){
    this.courseService.deleteStudentFromCourse(this.students[index].id,this.courseId).subscribe(res => {
      console.log(res);
      if(index === 0){
        this.students.shift()
      }
      else{
        this.students.splice(index,index);
      }
    })
  }

  onAddStudent(){
    this.isAddingStudent = true
  }

  closeForm(){
    this.isAddingStudent = false
  }

  AddStudent(event){
    this.students.push(event);
    this.isAddingStudent = false
  }

}
