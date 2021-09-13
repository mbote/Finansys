import { TestBed } from '@angular/core/testing';

import { Entry.ServiceService } from './entry.service';

describe('Entry.ServiceService', () => {
  let service: Entry.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Entry.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
