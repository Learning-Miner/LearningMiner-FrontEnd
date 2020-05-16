import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'cm-detail-editing-activity',
  templateUrl: './detail-editing-activity.component.html',
  styleUrls: ['./detail-editing-activity.component.css']
})
export class DetailEditingActivityComponent implements OnInit {

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

  addKeyword(event: any) {
    console.log(event.target.value);
    const keyword = event.target.value;
    this.keywordsArray.push(keyword);
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
