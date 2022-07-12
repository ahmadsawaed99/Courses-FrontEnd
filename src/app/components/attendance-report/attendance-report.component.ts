import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseClassService } from '../../services/course-class.service';
import { attendance } from '../../models/attendance.model';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {

  report : attendance[]=[]
  classId:number
  reason : string
  showReason : boolean = false
  constructor(private route : ActivatedRoute ,private classService : CourseClassService ) { }

  ngOnInit(): void {
    this.report = []
    this.route.paramMap.subscribe(params => {
      this.classId = Number.parseInt(params.get('id'))
      this.classService.getAttendanceReport(this.classId).subscribe(res =>{
        this.report = res;
      })

    })
  }
  onReason(index : number){
    this.report[index].absenceReason === null ? this.reason = 'The student has not updated his attendance status yet !' : this.reason = this.report[index].absenceReason
    this.showReason = true
  }

  onExit(){
    this.showReason = false
  }

}
