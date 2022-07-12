import { student } from "./student/student.model";

export interface attendance{
  student : student,
  doesAttend : boolean,
  absenceReason : string
}
