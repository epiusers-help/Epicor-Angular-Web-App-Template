import { TestBed } from '@angular/core/testing';

import { EpicorAuthGuardService } from './epicor-auth-guard.service';

describe('EpicorAuthGuardService', () => {
  let service: EpicorAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpicorAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
