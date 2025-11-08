import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsSelect } from './actions-select';

describe('ActionsSelect', () => {
  let component: ActionsSelect;
  let fixture: ComponentFixture<ActionsSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
