import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBooks } from './show-books';

describe('ShowBooks', () => {
  let component: ShowBooks;
  let fixture: ComponentFixture<ShowBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
