import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartDonutComponent } from './po-chart-donut.component';

describe('PoChartDonutComponent', () => {
  let component: PoChartDonutComponent;
  let fixture: ComponentFixture<PoChartDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartDonutComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
