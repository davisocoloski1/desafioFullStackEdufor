import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookBtn } from './add-book-btn';

describe('AddBookBtn', () => {
  let component: AddBookBtn;
  let fixture: ComponentFixture<AddBookBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
