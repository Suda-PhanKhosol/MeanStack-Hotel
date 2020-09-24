import { TestBed } from '@angular/core/testing';

import { RoomstatusService } from './roomstatus.service';

describe('RoomstatusService', () => {
  let service: RoomstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
