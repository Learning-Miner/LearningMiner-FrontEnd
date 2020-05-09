import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMapsComponent } from './group-maps.component';

describe('GroupMapsComponent', () => {
  let component: GroupMapsComponent;
  let fixture: ComponentFixture<GroupMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
