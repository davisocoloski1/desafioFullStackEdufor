import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookActions } from './book-actions';

describe('BookActions', () => {
  let component: BookActions;
  let fixture: ComponentFixture<BookActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
