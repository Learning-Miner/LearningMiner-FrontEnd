import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneMapsComponent } from './done-maps.component';

describe('DoneMapsComponent', () => {
  let component: DoneMapsComponent;
  let fixture: ComponentFixture<DoneMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
