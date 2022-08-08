import { TestBed } from '@angular/core/testing';

import { EpicorsvcService } from './epicorsvc.service';

describe('EpicorsvcService', () => {
  let service: EpicorsvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpicorsvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
