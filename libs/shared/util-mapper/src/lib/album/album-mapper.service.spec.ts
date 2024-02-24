import { TestBed } from '@angular/core/testing';

import { AlbumMapperService } from './album-mapper.service';

describe('AlbumMapperService', () => {
  let service: AlbumMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
