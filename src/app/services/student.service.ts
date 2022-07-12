import { ErrorHandler, Injectable } from '@angular/core';
import { student } from '../models/student/student.model';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, take, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { newStudent } from '../models/addStudent.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public students : student[] = []
  validStudentsToAdd : student[] = []
  private api = environment.ServerUrl
  constructor(private http : HttpClient) { }

  getUser(userId : string){

    return this.http.get<any>('https://localhost:5001/api/students/' + userId).pipe(map( res => {
      const user :student = {
        id : res.id,
        firstName : res.firstName,
        lastName : res.lastName,
        adress : res.adress,
        email:res.email
      }

      return user
    }))
  }

  postStudent(firstName:string,lastName:string,adress:string,email:string,confirmEmail:string,password:string,confirmPassword:string){
    return this.http.post(this.api+'/students',{firstName,lastName,adress,email,confirmEmail,password,confirmPassword})
    .pipe(catchError(this.handleError))
  }
  getStudents(){
    console.log(this.api)
    return this.http.get<Array<student>>('https://localhost:5001/api/students')
    .pipe(
      map(res => {
      this.students = []
      for (let key in res){
        if(res.hasOwnProperty(key)){
          let student : student = {
            id : res[key].id,
            firstName : res[key].firstName,
            lastName : res[key].lastName,
            adress : res[key].adress,
            email : res[key].email
          }
          this.students.push(student);
        }
      }
      return this.students
    }))

  }
  AddStudentToCourse(studentId : string , courseId : number){

    return this.http.post('https://localhost:5001/api/students/' + studentId +'/' + courseId,'').pipe(catchError(this.handleError));

  }

  deleteStudent(userId:string){
    this.http.delete('https://localhost:5001/api/students/'+ userId).subscribe();
  }
  getValidStudentsToAdd(courseId : number){
    return this.http.get<Array<student>>('https://localhost:5001/api/students/course/' + courseId)
    .pipe(
      map(res => {
      this.validStudentsToAdd = []
      for (let key in res){
        if(res.hasOwnProperty(key)){
          this.validStudentsToAdd.push(res[key])
        }
      }
      return this.validStudentsToAdd
    }))
  }

  updateProfile(userId : string , newUser : student){
    return this.http.put('https://localhost:5001/api/account/update/' + userId ,
    {firstName : newUser.firstName,lastName : newUser.lastName, email : newUser.email,adress : newUser.adress})
    .pipe(catchError(this.handleError))
  }

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

}
