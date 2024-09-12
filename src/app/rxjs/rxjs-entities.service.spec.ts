import { TestBed } from '@angular/core/testing';

import { RxjsEntitiesService } from './rxjs-entities.service';

describe('RxjsEntitiesService', () => {
  let service: RxjsEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
