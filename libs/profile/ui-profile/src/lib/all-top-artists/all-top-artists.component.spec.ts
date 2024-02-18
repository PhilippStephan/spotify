import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTopArtistsComponent } from './all-top-artists.component';

describe('AllTopArtistsComponent', () => {
  let component: AllTopArtistsComponent;
  let fixture: ComponentFixture<AllTopArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTopArtistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTopArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
