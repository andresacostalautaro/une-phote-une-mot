import { TestBed } from '@angular/core/testing';

import { Partage } from './partage';

describe('Partage', () => {
  let service: Partage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Partage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
