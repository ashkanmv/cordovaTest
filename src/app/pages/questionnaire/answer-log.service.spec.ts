import { TestBed } from '@angular/core/testing';

import { AnswerLogService } from './answer-log.service';

describe('AnswerLogService', () => {
  let service: AnswerLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
