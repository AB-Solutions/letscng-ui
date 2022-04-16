import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthSatelliteComponent } from './earth-satellite.component';

describe('EarthSatelliteComponent', () => {
  let component: EarthSatelliteComponent;
  let fixture: ComponentFixture<EarthSatelliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarthSatelliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarthSatelliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
