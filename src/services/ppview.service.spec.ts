import { TestBed } from '@angular/core/testing';

import { PpviewService } from './ppview.service';

describe('PpviewService', () => {
  let service: PpviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
