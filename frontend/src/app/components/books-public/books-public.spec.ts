import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPublic } from './books-public';

describe('BooksPublic', () => {
  let component: BooksPublic;
  let fixture: ComponentFixture<BooksPublic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPublic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksPublic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
