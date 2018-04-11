import { TestBed, inject } from '@angular/core/testing';

import { MatrixGeneratorService } from './matrix-generator.service';

describe('MatrixGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatrixGeneratorService]
    });
  });

  it('should be created', inject([MatrixGeneratorService], (service: MatrixGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
