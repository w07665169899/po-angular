import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartCircularPathComponent } from './po-chart-circular-path.component';

describe('PoChartCircularPathComponent', () => {
  let component: PoChartCircularPathComponent;
  let fixture: ComponentFixture<PoChartCircularPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartCircularPathComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartCircularPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
