import { TestBed } from '@angular/core/testing';

import { MaxPpedService } from './max-pped.service';

describe('MaxPpedService', () => {
  let service: MaxPpedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaxPpedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
