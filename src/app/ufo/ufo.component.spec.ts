import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfoComponent } from './ufo.component';

describe('UfoComponent', () => {
  let component: UfoComponent;
  let fixture: ComponentFixture<UfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
