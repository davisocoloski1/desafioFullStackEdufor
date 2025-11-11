import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoForm } from './book-info-form';

describe('BookInfoForm', () => {
  let component: BookInfoForm;
  let fixture: ComponentFixture<BookInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookInfoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
