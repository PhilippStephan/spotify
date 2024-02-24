import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackResultsComponent } from './track-results.component';

describe('TrackResultsComponent', () => {
  let component: TrackResultsComponent;
  let fixture: ComponentFixture<TrackResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
