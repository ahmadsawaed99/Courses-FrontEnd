import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { course } from '../models/course/course.model';
import { catchError, map, take, throwError , firstValueFrom, lastValueFrom } from 'rxjs';
import { AddCourse } from '../models/add-course.model';
import { student } from '../models/student/student.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public courses : course[] = []
  students : student[] = []
  private path = environment.ServerUrl;
  constructor(private http : HttpClient) { }

  getCourse(id : number){
    return this.http.get<course>('https://localhost:5001/api/courses/' + id);
  }
  getStudentCourses(studentId : string){
    return this.http.get<Array<course>>('https://localhost:5001/api/courses/student/' + studentId).pipe(
      map(res => {
      const studentCourses = []
      for (let key in res){
        if(res.hasOwnProperty(key)){

          let course : course = {
            id : res[key].id,
            name :res[key].name,
            startingDate : new Date(res[key].startingDate),
            endingDate : new Date(res[key].endingDate)
          }
          studentCourses.push(course)
        }
      }
      return studentCourses
    }))
  }

  getCourseStudents(id : number){
    return this.http.get<Array<student>>('https://localhost:5001/api/courses/students/' + id)
    .pipe(
      map(res => {
        for(let key in res){
          if(res.hasOwnProperty(key)){
            let student : student = {
              id : res[key].id,
              firstName : res[key].firstName,
              lastName : res[key].lastName,
              email : res[key].email,
              adress : res[key].adress
            }
            this.students.push(student);
          }
        }
        return this.students;

      })
    )

  }

  getCourses(){
    return this.http.get<Array<course>>('https://localhost:5001/api/courses')
    .pipe(
      map(res => {
      this.courses = []
      for (let key in res){
        if(res.hasOwnProperty(key)){

          let course : course = {
            id : res[key].id,
            name :res[key].name,
            startingDate : new Date(res[key].startingDate),
            endingDate : new Date(res[key].endingDate)
          }
          this.courses.push(course)
        }
      }
      return this.courses
    }))
  }

  deleteCourse(courseId:number){
    return this.http.delete(this.path + '/courses/'+ courseId).pipe(catchError(this.handleError))
  }
  postCourse(newCourse : AddCourse){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };


    JSON.stringify(newCourse)
    return this.http.post(this.path + '/courses', newCourse , httpOptions ).pipe(catchError(this.handleError))

  }

  isCourseInDb(courseName : string){

    return this.http.get(this.path + '/courses/DBCHECK/' + courseName)
  }

  // putCourse(){
  //   this.http.put()
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  deleteStudentFromCourse(studentId : string , courseId : number){
    return this.http.delete('https://localhost:5001/api/courses/' + studentId + '/' + courseId ).pipe(catchError(this.handleError));
  }

}
