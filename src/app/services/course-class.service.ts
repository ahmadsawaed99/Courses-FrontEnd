import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { attendance } from '../models/attendance.model';
import { classModel } from '../models/class.model';
import { classesFromServer } from '../models/classes-from-server.model';

@Injectable({
  providedIn: 'root'
})
export class CourseClassService {

  classes : classModel[] = []
  attendanceReport : attendance[] = []
  Days = ['Sunday','Monday','Tuesday','Wedensday','Thirsday','Friday','Saturday']

  constructor(private http : HttpClient , private datePipe : DatePipe) { }

  getCourseClasses(courseId : number){

    return this.http.get<Array<classesFromServer>>('https://localhost:5001/api/class/course/' + courseId)
    .pipe(
      map(res =>{
        for(let key in res){
          if(res.hasOwnProperty(key)){
            let courseClass : classModel = {
              id : res[key].id,
              day : this.Days[res[key].day],
              date : this.datePipe.transform(new Date(res[key].date),'dd-MM-yyyy'),
              fromHour : res[key].fromHour,
              untilHour : res[key].untilHour,
              isStatusUpdated : res[key].isStatusUpdated,
              isAttended : res[key].isStudentAttended,
              reason : res[key].reasonOfAbseance
            }
            this.classes.push(courseClass)
          }
        }
        return this.classes;
      })
    )

  }

  getStudentCourseClasses(courseId : number , userId:string){

    return this.http.get<Array<classesFromServer>>('https://localhost:5001/api/class/course-student/' + courseId + '/' + userId)
    .pipe(
      map(res =>{
        for(let key in res){
          if(res.hasOwnProperty(key)){
            let courseClass : classModel = {
              id : res[key].id,
              day : this.Days[res[key].day],
              date : this.datePipe.transform(new Date(res[key].date),'dd-MM-yyyy'),
              fromHour : res[key].fromHour,
              untilHour : res[key].untilHour,
              isStatusUpdated : res[key].isStatusUpdated,
              isAttended : res[key].isStudentAttended,
              reason : res[key].reasonOfAbseance
            }
            this.classes.push(courseClass)
          }
        }
        return this.classes;
      })
    )

  }
  getAttendanceReport(classId : number){
    return this.http.get('https://localhost:5001/api/class/' + classId).pipe(
      map(res => {
        this.attendanceReport = []
        for(let key in res){
          if(res.hasOwnProperty(key)){
            let studentAttendance : attendance = {
              student : res[key].student,
              doesAttend : res[key].doesAttend,
              absenceReason : res[key].absenceReason

            }
            this.attendanceReport.push(studentAttendance)
          }

        }
        return this.attendanceReport
      })
    )
  }

  updateStudentAttendanceStatus(classId : number , userId : string , isAttended : boolean , reason : string){
    return this.http.put('https://localhost:5001/api/class',{userId,classId,isAttended,reason})
  }
}
