import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksIndex } from './books-index';

describe('BooksIndex', () => {
  let component: BooksIndex;
  let fixture: ComponentFixture<BooksIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
