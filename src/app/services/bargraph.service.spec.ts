import { TestBed, inject } from '@angular/core/testing';

import { BargraphService } from './bargraph.service';

describe('BargraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BargraphService]
    });
  });

  it('should be created', inject([BargraphService], (service: BargraphService) => {
    expect(service).toBeTruthy();
  }));
});
