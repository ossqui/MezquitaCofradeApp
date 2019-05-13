import { TestBed } from '@angular/core/testing';

import { TempleService } from './temple.service';

describe('TempleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempleService = TestBed.get(TempleService);
    expect(service).toBeTruthy();
  });
});
