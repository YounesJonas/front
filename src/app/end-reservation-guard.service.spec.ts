import { TestBed } from '@angular/core/testing';

import { EndReservationGuardService } from './end-reservation-guard.service';

describe('EndReservationGuardService', () => {
  let service: EndReservationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndReservationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
