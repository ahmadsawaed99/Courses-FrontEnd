import { ClassesToAdd } from "./daysAndHoursOfCourse.model";

export interface AddCourse{
  name : string ,
  StartingDate : Date ,
  EndingDate : Date,
  DaysAndHoursOfCourses : Array<ClassesToAdd>

}
