import { TestBed } from '@angular/core/testing';

import { DataUploadService } from './data-upload.service';

describe('DataUploadService', () => {
  let service: DataUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
