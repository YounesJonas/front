import { TestBed } from '@angular/core/testing';

import { EscortsProfileGuardService } from './escorts-profile-guard.service';

describe('EscortsProfileGuardService', () => {
  let service: EscortsProfileGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscortsProfileGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
