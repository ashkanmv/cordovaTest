import { TestBed } from '@angular/core/testing';

import { CustomerHistoryService } from './customer-history.service';

describe('CustomerHistoryService', () => {
  let service: CustomerHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
