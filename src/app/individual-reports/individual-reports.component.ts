import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'cm-individual-reports',
  templateUrl: './individual-reports.component.html',
  styleUrls: ['./individual-reports.component.css']
})
export class IndividualReportsComponent implements OnInit {

  baseId = '';
  students: Array<any> = [];

  constructor(
    private service: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.baseId = this.route.snapshot.params.baseId;
    this.service.getStudentsReports(this.baseId).subscribe(res => {
      console.log(res);
      this.students = res;
    }, err => {
      console.log(err);
    });
  }

  storeStudentId(std_id) {
    localStorage.setItem('std_id', std_id);
  }
}
