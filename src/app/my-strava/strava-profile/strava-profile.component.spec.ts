import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StravaProfileComponent } from './strava-profile.component';

describe('StravaProfileComponent', () => {
  let component: StravaProfileComponent;
  let fixture: ComponentFixture<StravaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StravaProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StravaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
