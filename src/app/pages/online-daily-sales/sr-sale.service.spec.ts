import { TestBed } from '@angular/core/testing';

import { SrSaleService } from './sr-sale.service';

describe('SrSaleService', () => {
  let service: SrSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
