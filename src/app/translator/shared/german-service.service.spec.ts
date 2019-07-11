import { TestBed, inject } from '@angular/core/testing';

import { GermanServiceService } from './german-service.service';

describe('GermanServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GermanServiceService]
    });
  });

  it('should be created', inject([GermanServiceService], (service: GermanServiceService) => {
    expect(service).toBeTruthy();
  }));
});
