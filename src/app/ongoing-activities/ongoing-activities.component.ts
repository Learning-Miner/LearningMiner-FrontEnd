import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'cm-ongoing-activities',
  templateUrl: './ongoing-activities.component.html',
  styleUrls: ['./ongoing-activities.component.css']
})
export class OngoingActivitiesComponent implements OnInit {

  activities: Array<any> = [];

  constructor(
    public service: UserService
  ) { }

  ngOnInit() {
    this.service.getActivities('open')
      .subscribe(res => {
        this.activities = res;
        console.log(this.activities);
      }, err => {
        console.log(err);
      });
  }

}
