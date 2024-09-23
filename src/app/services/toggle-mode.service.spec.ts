import { TestBed } from '@angular/core/testing';

import { ToggleModeService } from './toggle-mode.service';

describe('ToggleModeService', () => {
  let service: ToggleModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
