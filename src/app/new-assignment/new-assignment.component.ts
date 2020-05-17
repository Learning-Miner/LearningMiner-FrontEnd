import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'cm-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.css']
})
export class NewAssignmentComponent implements OnInit {

  keywordsArray: Array<string> = [];
  activityForm: FormGroup;
  alert = false;
  alertDanger = false;
  alertSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.buildActivityForm();
  }

  private buildActivityForm() {
    this.activityForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      closureDate: ['', [Validators.required]],
      closureHour: ['', [Validators.required]],
      authors: ['', [Validators.required]],
      database: ['', [Validators.required]]
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

  addActivity() {
    console.log(this.activityForm);
    this.alert = true;
    this.alertDanger = false;
    const data = {
      'title': this.activityForm.get('title').value,
      'text': this.activityForm.get('text').value,
      'dateClose': this.activityForm.get('closureDate').value + 'T' + this.activityForm.get('closureHour').value,
      'authors': this.activityForm.get('authors').value,
      'database': this.activityForm.get('database').value
    };
    this.service.createActivity(data).subscribe(res => {
      console.log(res);
      this.alertSuccess = true;
      // this.alert = false;
      this.router.navigate(['/activity/' + res.act_id]);
    }, err => {
      this.alertDanger = true;
      this.alert = false;
      console.log(err);
    });
  }
}
