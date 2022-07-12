import { Component, OnInit } from '@angular/core';
import { student } from 'src/app/models/student/student.model';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn :boolean
  isProf : boolean
  user : student
  constructor(private authService: AuthService , private studentService : StudentService) { }

  ngOnInit(): void {
    this.user = {
      id : '',
      firstName : '',
      lastName : '',
      email : '',
      adress : ''
    }
    this.authService.AuthStatus()
    this.authService.currentStatus.subscribe(res => {
      this.isLoggedIn = res
    })

    this.authService.isUserProf()
    this.authService.currentUserRole.subscribe(res => {
      this.isProf = res
    })

    this.studentService.getUser(localStorage.getItem('userId')).subscribe(res => {
      this.user = res
    })

  }

  onLogOut(){
    this.isLoggedIn = false
    localStorage.removeItem('token')
    localStorage.removeItem('roles')
  }

}
