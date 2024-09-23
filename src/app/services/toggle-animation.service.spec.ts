import { TestBed } from '@angular/core/testing';

import { ToggleAnimationService } from './toggle-animation.service';

describe('ToggleAnimationService', () => {
  let service: ToggleAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
