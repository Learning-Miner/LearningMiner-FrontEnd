import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'cm-closed-activities',
  templateUrl: './closed-activities.component.html',
  styleUrls: ['./closed-activities.component.css']
})
export class ClosedActivitiesComponent implements OnInit {

  activities: Array<any> = [];

  constructor(
    public service: UserService
  ) { }

  ngOnInit() {
    this.service.getActivities('closed')
      .subscribe(res => {
        this.activities = res;
        console.log(this.activities);
      }, err => {
        console.log(err);
    });
  }

}
