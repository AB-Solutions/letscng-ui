import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventRidesComponent } from './my-event-rides.component';

describe('MyEventRidesComponent', () => {
  let component: MyEventRidesComponent;
  let fixture: ComponentFixture<MyEventRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEventRidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
