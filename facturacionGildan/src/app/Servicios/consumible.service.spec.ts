import { TestBed } from '@angular/core/testing';

import { ConsumibleService } from './consumible.service';

describe('ConsumibleService', () => {
  let service: ConsumibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
