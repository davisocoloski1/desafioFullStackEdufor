import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraphic } from './bar-graphic';

describe('BarGraphic', () => {
  let component: BarGraphic;
  let fixture: ComponentFixture<BarGraphic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarGraphic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarGraphic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
