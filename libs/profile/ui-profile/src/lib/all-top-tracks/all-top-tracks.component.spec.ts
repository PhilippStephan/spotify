import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTopTracksComponent } from './all-top-tracks.component';

describe('AllTopTracksComponent', () => {
  let component: AllTopTracksComponent;
  let fixture: ComponentFixture<AllTopTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTopTracksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTopTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
