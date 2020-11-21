import { TestBed } from '@angular/core/testing';

import { AppointmentsGuardService } from './appointments-guard.service';

describe('AppointmentsGuardService', () => {
  let service: AppointmentsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
