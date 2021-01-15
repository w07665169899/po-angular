import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartCircularAnimationComponent } from './po-chart-circular-animation.component';

describe('PoChartCircularAnimationComponent', () => {
  let component: PoChartCircularAnimationComponent;
  let fixture: ComponentFixture<PoChartCircularAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartCircularAnimationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartCircularAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
