import { TestBed } from '@angular/core/testing';

import { SendText } from './send-text';

describe('SendText', () => {
  let service: SendText;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendText);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
