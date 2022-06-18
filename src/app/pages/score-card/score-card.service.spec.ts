import { TestBed } from '@angular/core/testing';

import { ScoreCardService } from './score-card.service';

describe('ScoreCardService', () => {
  let service: ScoreCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
