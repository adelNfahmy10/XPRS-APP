import { TestBed } from '@angular/core/testing';

import { StoresSerivce } from './stores-serivce';

describe('StoresSerivce', () => {
  let service: StoresSerivce;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoresSerivce);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
