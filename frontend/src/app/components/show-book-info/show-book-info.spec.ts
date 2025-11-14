import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBookInfo } from './show-book-info';

describe('ShowBookInfo', () => {
  let component: ShowBookInfo;
  let fixture: ComponentFixture<ShowBookInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBookInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBookInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
