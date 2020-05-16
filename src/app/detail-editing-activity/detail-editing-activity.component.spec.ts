import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEditingActivityComponent } from './detail-editing-activity.component';

describe('DetailEditingActivityComponent', () => {
  let component: DetailEditingActivityComponent;
  let fixture: ComponentFixture<DetailEditingActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEditingActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEditingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
