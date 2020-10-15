import { TestBed } from '@angular/core/testing';

import { SqlRepositoryService } from './sql-repository.service';

describe('SqlRepositoryService', () => {
  let service: SqlRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
