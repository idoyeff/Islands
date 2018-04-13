import { TestBed, inject } from '@angular/core/testing';

import { TablePagingService } from './table-paging.service';

describe('TablePagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablePagingService]
    });
  });

  it('should be created', inject([TablePagingService], (service: TablePagingService) => {
    expect(service).toBeTruthy();
  }));
});
