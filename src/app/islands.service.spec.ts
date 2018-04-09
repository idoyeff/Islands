import { TestBed, inject } from '@angular/core/testing';

import { IslandsService } from './islands.service';

describe('IslandsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IslandsService]
    });
  });

  it('should be created', inject([IslandsService], (service: IslandsService) => {
    expect(service).toBeTruthy();
  }));
});
