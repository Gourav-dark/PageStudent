import { TestBed } from '@angular/core/testing';

import { ToastsVariableService } from './toasts-variable.service';

describe('ToastsVariableService', () => {
  let service: ToastsVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastsVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
