import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStatisticsComponent } from './track-statistics.component';

describe('TrackStatisticsComponent', () => {
  let component: TrackStatisticsComponent;
  let fixture: ComponentFixture<TrackStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
