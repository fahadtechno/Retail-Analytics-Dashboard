import { TestBed, inject } from '@angular/core/testing';

import { PiechartService } from './piechart.service';

describe('PiechartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiechartService]
    });
  });

  it('should be created', inject([PiechartService], (service: PiechartService) => {
    expect(service).toBeTruthy();
  }));
});
