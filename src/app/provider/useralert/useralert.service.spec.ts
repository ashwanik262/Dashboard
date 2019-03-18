import { TestBed } from '@angular/core/testing';

import { UseralertService } from './useralert.service';

describe('UseralertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UseralertService = TestBed.get(UseralertService);
    expect(service).toBeTruthy();
  });
});
