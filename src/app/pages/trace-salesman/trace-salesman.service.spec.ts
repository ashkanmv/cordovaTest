import { TestBed } from '@angular/core/testing';

import { TraceSalesmanService } from './trace-salesman.service';

describe('TraceSalesmanService', () => {
  let service: TraceSalesmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraceSalesmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
