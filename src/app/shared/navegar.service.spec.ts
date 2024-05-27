import { TestBed } from '@angular/core/testing';

import { NavegarService } from './navegar.service';

describe('NavegarService', () => {
  let service: NavegarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavegarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
