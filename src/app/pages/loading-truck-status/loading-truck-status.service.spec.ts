import { TestBed } from '@angular/core/testing';

import { LoadingTruckStatusService } from './loading-truck-status.service';

describe('LoadingTruckStatusService', () => {
  let service: LoadingTruckStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingTruckStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
