import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'cm-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.css']
})
export class NewAssignmentComponent implements OnInit {

  keywordsArray: Array<string> = [];
  activityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildActivityForm();
  }

  private buildActivityForm() {
    this.activityForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      closureDate: ['', [Validators.required]],
      keywords: ['', [Validators.required]]
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
    console.log(this.keywordsArray);
    this.activityForm.get('keywords').setValue(this.keywordsArray);
    console.log(this.activityForm);
  }
}
