import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookPopup } from './add-book-popup';

describe('AddBookPopup', () => {
  let component: AddBookPopup;
  let fixture: ComponentFixture<AddBookPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
