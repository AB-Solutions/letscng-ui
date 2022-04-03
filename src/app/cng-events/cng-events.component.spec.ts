import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CngEventsComponent } from './cng-events.component';

describe('CngEventsComponent', () => {
  let component: CngEventsComponent;
  let fixture: ComponentFixture<CngEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CngEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CngEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
