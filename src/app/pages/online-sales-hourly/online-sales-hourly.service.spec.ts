import { TestBed } from '@angular/core/testing';

import { OnlineSalesHourlyService } from './online-sales-hourly.service';

describe('OnlineSalesHourlyService', () => {
  let service: OnlineSalesHourlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineSalesHourlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
