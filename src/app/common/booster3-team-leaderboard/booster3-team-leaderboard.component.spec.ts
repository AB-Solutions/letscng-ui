import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Booster3TeamLeaderboardComponent } from './booster3-team-leaderboard.component';

describe('Booster3TeamLeaderboardComponent', () => {
  let component: Booster3TeamLeaderboardComponent;
  let fixture: ComponentFixture<Booster3TeamLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Booster3TeamLeaderboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Booster3TeamLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
