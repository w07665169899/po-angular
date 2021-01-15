import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartCircularComponent } from './po-chart-circular.component';

describe('PoChartCircularComponent', () => {
  let component: PoChartCircularComponent;
  let fixture: ComponentFixture<PoChartCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartCircularComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
