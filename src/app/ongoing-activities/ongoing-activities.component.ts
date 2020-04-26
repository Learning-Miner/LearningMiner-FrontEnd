import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cm-ongoing-activities',
  templateUrl: './ongoing-activities.component.html',
  styleUrls: ['./ongoing-activities.component.css']
})
export class OngoingActivitiesComponent implements OnInit {

  activities: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
