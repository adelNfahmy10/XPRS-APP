import { TestBed } from '@angular/core/testing';

import { RefreshAppService } from './refresh-app-service';

describe('RefreshAppService', () => {
  let service: RefreshAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
