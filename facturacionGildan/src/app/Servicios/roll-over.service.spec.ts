import { TestBed } from '@angular/core/testing';

import { RollOverService } from './roll-over.service';

describe('RollOverService', () => {
  let service: RollOverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollOverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
