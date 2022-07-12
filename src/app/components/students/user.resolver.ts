import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { student } from 'src/app/models/student/student.model';
import { StudentService } from 'src/app/services/student.service';

@Injectable({
  providedIn: 'root'
})

export class UserResolver implements Resolve<any> {

students : student[] = []
constructor(private studentService : StudentService , private router : Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.studentService.getStudents()
  }
}
