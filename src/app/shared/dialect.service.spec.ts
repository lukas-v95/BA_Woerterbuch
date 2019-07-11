import { TestBed, inject } from '@angular/core/testing';

import { DialectService } from './dialect.service';

describe('DialectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialectService]
    });
  });

  it('should be created', inject([DialectService], (service: DialectService) => {
    expect(service).toBeTruthy();
  }));
});
