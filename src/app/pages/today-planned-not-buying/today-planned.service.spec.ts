import { TestBed } from '@angular/core/testing';

import { TodayPlannedService } from './today-planned.service';

describe('TodayPlannedService', () => {
  let service: TodayPlannedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodayPlannedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
