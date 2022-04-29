import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPerformersLeaderboardComponent } from './top-performers-leaderboard.component';

describe('TopPerformersLeaderboardComponent', () => {
  let component: TopPerformersLeaderboardComponent;
  let fixture: ComponentFixture<TopPerformersLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPerformersLeaderboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPerformersLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
