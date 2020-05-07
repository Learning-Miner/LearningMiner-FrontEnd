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
  keywordsArray: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activityId = this.route.snapshot.params.id;
    this.service.getActivity(this.activityId).subscribe(res => {
      console.log(res);
      this.activity = res;
      this.keywordsArray = res.key_concepts;
    }, err => {
      console.log(err);
    });
  }

  addKeyword(event: any) {
    console.log(event.target.value);
    const keyword = event.target.value;
    this.keywordsArray.push(keyword);
  }

  removeKeyword(i) {
    this.keywordsArray.splice(i, 1);
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
    this.router.navigate(['/editor/' + this.activity.baseId]);
  }
}
