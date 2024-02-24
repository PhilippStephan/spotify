import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistResultsComponent } from './playlist-results.component';

describe('PlaylistResultsComponent', () => {
  let component: PlaylistResultsComponent;
  let fixture: ComponentFixture<PlaylistResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
