import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTotalGraphComponent } from './all-total-graph.component';

describe('AllTotalGraphComponent', () => {
  let component: AllTotalGraphComponent;
  let fixture: ComponentFixture<AllTotalGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTotalGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTotalGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
