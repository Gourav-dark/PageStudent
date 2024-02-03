import { TestBed } from '@angular/core/testing';

import { SessionTokenManagerService } from './session-token-manager.service';

describe('SessionTokenManagerService', () => {
  let service: SessionTokenManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTokenManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
