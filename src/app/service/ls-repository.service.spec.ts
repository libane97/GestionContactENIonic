import { TestBed } from '@angular/core/testing';

import { LsRepositoryService } from './ls-repository.service';

describe('LsRepositoryService', () => {
  let service: LsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
