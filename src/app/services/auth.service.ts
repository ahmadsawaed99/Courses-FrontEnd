import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { authResponse } from '../models/authResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  private api = environment.ServerUrl

  private isLogged = new BehaviorSubject<boolean>(false)
  private isProf = new BehaviorSubject<boolean>(false)

  currentStatus = this.isLogged.asObservable()
  currentUserRole = this.isProf.asObservable()

  response : authResponse = {token : '' , userRoles : [] , userId : ''}
  userRoles : string[]
  login(Email : string , Password : string){

    return this.http.post(this.api +'/account/login',{email : Email,password : Password}).pipe(
      map((res : any) => {
        this.response.token = res.token
        this.response.userRoles = res.roles
        this.response.userId = res.userId
        return this.response
      })
    )
  }

  changePassword(userId : string ,currentPassword:string,newPassword:string,confirmNewPassword: string){

    return this.http.put(this.api + '/account/changePassword/' + userId,{currentPassword,newPassword,confirmNewPassword})
  }
  isLoggedIn(){
    return localStorage.getItem('token') !== null

  }
  GetToken(){
    return localStorage.getItem('token')

  }

  AuthStatus(){
    this.isLogged.next(this.isLoggedIn())
  }

  userRole(){
    return localStorage.getItem('roles') !== 'undefined'
  }

  isUserProf(){
    this.isProf.next(this.userRole())
  }
}
