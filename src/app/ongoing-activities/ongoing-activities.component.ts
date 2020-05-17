import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'cm-ongoing-activities',
  templateUrl: './ongoing-activities.component.html',
  styleUrls: ['./ongoing-activities.component.css']
})
export class OngoingActivitiesComponent implements OnInit {

  activities: Array<any> = [];

  constructor(
    public service: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.service.getActivities('open')
      .subscribe(res => {
        if (!res.Message) {
          this.activities = res;
          console.log(this.activities);
        }
      }, err => {
        console.log(err);
      });
  }

  closeActivity(baseId, actId) {
    this.service.closeActivity(actId).subscribe(tasks => {
      console.log(tasks);
      this.router.navigate(['/closedActivities'])
        .then(() => {
          window.location.reload();
        });
      /*this.service.createReports(baseId).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });*/
    }, error => {
      console.log(error);
    });
  }

}
