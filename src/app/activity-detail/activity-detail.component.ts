import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'cm-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

  activityId = '';
  activity: any;
  keyword = '';
  keywordsArray: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public service: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.service.isTeacher()) {
      this.activityId = this.route.snapshot.params.id;
      this.service.getActivityTeacher(this.activityId).subscribe(res => {
        console.log(res);
        this.activity = res;
        this.keywordsArray = res.key_concepts;
      }, err => {
        console.log(err);
      });
    } else {
      this.activityId = this.route.snapshot.params.id;
      this.service.getActivityStudent(this.activityId).subscribe(res => {
        console.log(res);
        this.activity = res;
        this.keywordsArray = res.key_concepts;
      }, err => {
        console.log(err);
      });
    }
  }

  addKeyword() {
    this.keywordsArray.push(this.keyword);
    this.keyword = '';
  }

  removeKeyword(i) {
    if (this.service.isTeacher()) {
      this.keywordsArray.splice(i, 1);
    }
  }

  updateActivity() {
    this.activity.key_concepts = this.keywordsArray;
    this.service.updateActivity(this.activityId, this.activity).subscribe(res => {
      console.log(res);
      window.location.reload();
    }, err => {
      console.log(err);
    });
  }

  goBaseMap() {
    localStorage.setItem('mapId', this.activity.baseId);
    this.router.navigate(['/editor/' + this.activity.baseId])
      .then(() => {
        window.location.reload();
      });
  }

  click(title: string, baseId) {
    this.service.createMap(title, baseId).subscribe(res => {
      console.log(res);
      this.router.navigate(['/editor/' + res.id]);
    }, err => {
      console.log(err);
    });
  }
}
