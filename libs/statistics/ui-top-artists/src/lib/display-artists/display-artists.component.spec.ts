import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayArtistsComponent } from './display-artists.component';

describe('DisplayArtistsComponent', () => {
  let component: DisplayArtistsComponent;
  let fixture: ComponentFixture<DisplayArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayArtistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
