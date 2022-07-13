import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authResponse } from 'src/app/models/authResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  LogInForm:FormGroup;
  email : AbstractControl
  password : AbstractControl
  response : authResponse = {token :'',userRoles:[] , userId : ''}
  isError : boolean = false

  constructor(private fb:FormBuilder , private authService : AuthService , private router : Router) { }

  ngOnInit(): void {

    if(this.authService.isLoggedIn){
      this.router.navigate(['/home'])
    }

    this.LogInForm = this.fb.group({
      email:['',[Validators.required,Validators.minLength(3),Validators.email ]],
      password:['',[Validators.required,Validators.minLength(3)]],
    })

    this.email = this.LogInForm.get('email')
    this.password = this.LogInForm.get('password')

  }
  onSubmit(){
    this.authService.login(this.LogInForm.get('email').value,this.LogInForm.get('password').value).subscribe((res :authResponse)  => {
      this.response.token = res.token
      this.response.userRoles = res.userRoles
      this.response.userId = res.userId
      localStorage.setItem('token',this.response.token)
      localStorage.setItem('roles',this.response.userRoles[0])
      localStorage.setItem('userId',this.response.userId)
      this.router.navigate(['/home'])
      this.authService.isUserProf()
      this.authService.AuthStatus()
    },
    err => {
      console.log(err)
      if(err.status === 401){
        this.isError = true
      }
      if(err.status === 400){
        this.isError = true
      }
    }
    )
  }

}
