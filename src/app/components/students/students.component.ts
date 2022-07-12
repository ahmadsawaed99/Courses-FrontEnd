import { HttpClient,JsonpClientBackend } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';

import { DataService } from '../../services/data.service';
import { newStudent } from '../../models/addStudent.model';
import { student } from '../../models/student/student.model';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers:[DataService]
})
export class StudentsComponent implements OnInit {



  isAddingNewStudent:boolean = false;
  studentsToDisplay : student[];
  students : student[];
  constructor( private stService : StudentService , private http : HttpClient , private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.stService.getStudents().subscribe(res => {
    //   this.students = res;
    //   this.studentsToDisplay = res;
    // })

    this.students = this.route.snapshot.data['students']
    // this.students = this.route.snapshot.data['students']
    this.studentsToDisplay = this.students
  }
  onSearch(event){
    this.studentsToDisplay = this.students.filter(s => s.firstName.includes(event.target.value))
  }

  onAddStudent(){
    this.isAddingNewStudent = true;
  }

  studentToADD(event? :student){
    this.isAddingNewStudent = false

    if(event !== (null || undefined)){

      this.students.push(event);

      this.studentsToDisplay = this.students

    }
  }

  closeTheForm (){
    this.isAddingNewStudent = false
  }
  onDelete(index: number){
    console.log(index)
    this.stService.deleteStudent(this.students[index].id);
    if(index === 0){
      this.students.shift()
    }
    else{
      this.students.splice(index,index);
    }

  }
}
