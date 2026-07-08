import { TestBed } from '@angular/core/testing';

import { TvsPointsService } from './tvs-points-service';

describe('TvsPointsService', () => {
  let service: TvsPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvsPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
