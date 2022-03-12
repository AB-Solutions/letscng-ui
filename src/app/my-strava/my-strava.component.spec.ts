import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStravaComponent } from './my-strava.component';

describe('MyStravaComponent', () => {
  let component: MyStravaComponent;
  let fixture: ComponentFixture<MyStravaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyStravaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStravaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
