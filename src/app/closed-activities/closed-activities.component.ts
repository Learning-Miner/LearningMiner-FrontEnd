import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cm-closed-activities',
  templateUrl: './closed-activities.component.html',
  styleUrls: ['./closed-activities.component.css']
})
export class ClosedActivitiesComponent implements OnInit {

  activities: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
