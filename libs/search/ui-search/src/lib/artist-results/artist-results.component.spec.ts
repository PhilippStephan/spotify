import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistResultsComponent } from './artist-results.component';

describe('ArtistResultsComponent', () => {
  let component: ArtistResultsComponent;
  let fixture: ComponentFixture<ArtistResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
