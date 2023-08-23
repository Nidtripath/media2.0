import { TestBed } from '@angular/core/testing';

import { WsresponseService } from './wsresponse.service';

describe('WsresponseService', () => {
  let service: WsresponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsresponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
