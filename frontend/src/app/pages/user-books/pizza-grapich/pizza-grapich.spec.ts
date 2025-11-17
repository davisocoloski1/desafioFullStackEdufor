import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaGrapich } from './pizza-grapich';

describe('PizzaGrapich', () => {
  let component: PizzaGrapich;
  let fixture: ComponentFixture<PizzaGrapich>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaGrapich]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaGrapich);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
