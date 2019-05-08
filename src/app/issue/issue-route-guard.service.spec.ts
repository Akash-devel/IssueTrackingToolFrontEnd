import { TestBed } from '@angular/core/testing';

import { IssueRouteGuardService } from './issue-route-guard.service';

describe('IssueRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueRouteGuardService = TestBed.get(IssueRouteGuardService);
    expect(service).toBeTruthy();
  });
});
