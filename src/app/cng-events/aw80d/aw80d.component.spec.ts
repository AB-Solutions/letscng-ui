import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aw80dComponent } from './aw80d.component';

describe('Aw80dComponent', () => {
  let component: Aw80dComponent;
  let fixture: ComponentFixture<Aw80dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Aw80dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Aw80dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
