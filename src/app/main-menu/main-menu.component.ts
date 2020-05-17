import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'cm-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  pendingMaps: Array<string> = [];
  editingMaps: Array<string> = [];
  doneMaps: Array<string> = [];
  activities: Array<any> = [];

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit() {
    if (this.userService.isStudent()) {
      this.userService.getMaps('edit').subscribe(resEdit => {
        for (const item of resEdit) {
          this.editingMaps.push(item.title);
        }
      }, error => {
        console.log(error);
      });

      this.userService.getMaps('done').subscribe(resDone => {
        for (const item of resDone) {
          this.doneMaps.push(item.title);
        }
      }, error => {
        console.log(error);
      });

      this.userService.getMaps('to-do').subscribe(resPending => {
        for (const item of resPending) {
          this.pendingMaps.push(item.title);
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.userService.getActivities('open')
        .subscribe(res => {
          if (!res.Message) {
            for (const item of res) {
              this.userService.getActivityTeacher(item.actId)
                .subscribe(tasks => {
                  this.activities.push(tasks);
                });
            }
            console.log(this.activities);
          }
        }, err => {
          console.log(err);
        });
    }
  }

}
