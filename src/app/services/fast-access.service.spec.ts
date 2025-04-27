import { TestBed } from '@angular/core/testing';

import { FastAccessService } from './fast-access.service';

describe('FastAccessService', () => {
  let service: FastAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
