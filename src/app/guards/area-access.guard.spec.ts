import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { areaAccessGuard } from './area-access.guard';

describe('areaAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => areaAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
