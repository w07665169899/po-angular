import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartCircularLabelComponent } from './po-chart-circular-label.component';

describe('PoChartCircularLabelComponent', () => {
  let component: PoChartCircularLabelComponent;
  let fixture: ComponentFixture<PoChartCircularLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartCircularLabelComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartCircularLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
