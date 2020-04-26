import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingActivitiesComponent } from './ongoing-activities.component';

describe('OngoingActivitiesComponent', () => {
  let component: OngoingActivitiesComponent;
  let fixture: ComponentFixture<OngoingActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
