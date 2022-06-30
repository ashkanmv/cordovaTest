import { TestBed } from '@angular/core/testing';

import { SalesmenLocationService } from './salesmen-location.service';

describe('SalesmenLocationService', () => {
  let service: SalesmenLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesmenLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
