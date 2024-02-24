import { TestBed } from '@angular/core/testing';

import { ArtistMapperService } from './artist-mapper.service';

describe('ArtistMapperService', () => {
  let service: ArtistMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
