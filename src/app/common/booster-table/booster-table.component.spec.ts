import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoosterTableComponent } from './booster-table.component';

describe('BoosterTableComponent', () => {
  let component: BoosterTableComponent;
  let fixture: ComponentFixture<BoosterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoosterTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoosterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
