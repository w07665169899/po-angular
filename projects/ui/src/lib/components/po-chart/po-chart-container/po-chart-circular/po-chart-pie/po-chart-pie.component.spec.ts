import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartPieComponent } from './po-chart-pie.component';

describe('PoChartPieComponent', () => {
  let component: PoChartPieComponent;
  let fixture: ComponentFixture<PoChartPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartPieComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
