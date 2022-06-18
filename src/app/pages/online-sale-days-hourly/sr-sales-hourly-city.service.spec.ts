import { TestBed } from '@angular/core/testing';

import { SrSalesHourlyCityService } from './sr-sales-hourly-city.service';

describe('SrSalesHourlyCityService', () => {
  let service: SrSalesHourlyCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrSalesHourlyCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
