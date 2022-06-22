import { TestBed } from '@angular/core/testing';

import { DailyStatusService } from './daily-status.service';

describe('DailyStatusService', () => {
  let service: DailyStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
