import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { course } from 'src/app/models/course/course.model';
import { student } from 'src/app/models/student/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student-to-course',
  templateUrl: './add-student-to-course.component.html',
  styleUrls: ['./add-student-to-course.component.css']
})
export class AddStudentToCourseComponent implements OnInit {

  @Output() passStudent = new EventEmitter<student>();
  @Output() closeWithoutAdding = new EventEmitter<string>();

  @Input() courseId : number
  students : student[] = []

  studentId : string = null

  student : student
  requiredError = false
  constructor(private studentService : StudentService ) { }

  ngOnInit(): void {

    this.studentService.getValidStudentsToAdd(this.courseId).subscribe(res => {
      this.students = res
    })

  }

  onSubmit(){
    if(this.studentId === null){
      this.requiredError = true
    }
    else{
      this.requiredError = false
      this.studentService.AddStudentToCourse(this.studentId , this.courseId).subscribe(res =>{
        this.student = this.students.find(s => s.id == this.studentId);

        this.passStudent.emit(this.student)
      },
      err =>{
        console.log(err)
      }
      )
    }
  }
  onChange(event){
    this.studentId = event
  }
  onClear(){
    this.closeWithoutAdding.emit();
  }

}
