import { TestBed } from '@angular/core/testing';

import { PersianCalendarService } from './persian-calendar.service';

describe('PersianCalendarService', () => {
  let service: PersianCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersianCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
