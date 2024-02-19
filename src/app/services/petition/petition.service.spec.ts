import { TestBed } from '@angular/core/testing';

import { PetitionService } from './petition.service';

describe('PetitionService', () => {
  let service: PetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
