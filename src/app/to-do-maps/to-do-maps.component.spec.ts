import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoMapsComponent } from './to-do-maps.component';

describe('ToDoMapsComponent', () => {
  let component: ToDoMapsComponent;
  let fixture: ComponentFixture<ToDoMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
