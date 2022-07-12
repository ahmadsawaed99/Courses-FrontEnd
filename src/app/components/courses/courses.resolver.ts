import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolver implements Resolve<any> {

  constructor(private courseService : CourseService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.courseService.getCourses()
  }
}
