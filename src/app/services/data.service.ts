import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  info1:string[] = ["ahmad","207","test@test.com"]
  info2:string[] = ["roni","208","test@test.com"]
  info3:string[] = ["dani","209","test@test.com"]

  getInfo1():string[]{
    return this.info1
  }
  getInfo2():string[]{
    return this.info2
  }
  getInfo3():string[]{
    return this.info3
  }
  constructor() { }
}
