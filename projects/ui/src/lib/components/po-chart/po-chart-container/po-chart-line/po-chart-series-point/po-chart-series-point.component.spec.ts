import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import * as UtilsFunction from '../../../../../utils/util';

import { PoTooltipModule } from 'projects/ui/src/lib/directives/po-tooltip/po-tooltip.module';
import { PoChartSeriesPointComponent } from './po-chart-series-point.component';
import { PoChartPointsCoordinates } from '../../../interfaces/po-chart-points-coordinates.interface';

describe('PoChartSeriesPointComponent', () => {
  let component: PoChartSeriesPointComponent;
  let fixture: ComponentFixture<PoChartSeriesPointComponent>;
  let nativeElement;

  const coordinates = {
    category: 'janeiro',
    tooltipLabel: 'Vancouver: 200',
    label: 'Vancouver',
    data: 200,
    xCoordinate: 200,
    yCoordinate: 200
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoTooltipModule],
      declarations: [PoChartSeriesPointComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartSeriesPointComponent);
    component = fixture.componentInstance;
    component.coordinates = [coordinates];
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods:', () => {
    it('onClick: should emit `pointClick` with an object with `label`, `data` and `category`', () => {
      const spyPointClick = spyOn(component.pointClick, 'emit');

      component.onClick(coordinates);

      const expectedParam = {
        label: coordinates.label,
        data: coordinates.data,
        category: coordinates.category
      };

      expect(spyPointClick).toHaveBeenCalledWith(expectedParam);
    });

    it('onMouseEnter: should call `setPointAttribute` and emit `pointHover` with an object with `relativeTo`, `category`, `value` and `axisCategory`', () => {
      const event = { target: { r: '2', fill: 'red' } };

      const spyPointHover = spyOn(component.pointHover, 'emit');
      const spySetPointAttribute = spyOn(component, <any>'setPointAttribute');

      component.onMouseEnter(event, coordinates);

      const expectedParam = {
        relativeTo: undefined,
        label: coordinates.label,
        data: coordinates.data,
        category: coordinates.category
      };

      expect(spySetPointAttribute).toHaveBeenCalledWith(event.target, true);
      expect(spyPointHover).toHaveBeenCalledWith(expectedParam);
    });

    it('onMouseLeave: should call `setPointAttribute`', () => {
      const event = { target: { r: '2', fill: 'red' } };

      const spySetPointAttribute = spyOn(component, <any>'setPointAttribute');

      component.onMouseLeave(event);

      expect(spySetPointAttribute).toHaveBeenCalledWith(event.target, false);
    });

    it('setPointAttribute: should call `setStyle` and `setAttribute` if `isHover` is true', () => {
      const event = { target: { r: '2', fill: 'red' } };

      const spySetAttribute = spyOn(component['renderer'], 'setAttribute');
      const spysetStyle = spyOn(component['renderer'], 'setStyle');
      const spyRemoveStyle = spyOn(component['renderer'], 'removeStyle');

      component['setPointAttribute'](<any>event.target, true);

      expect(spySetAttribute).toHaveBeenCalled();
      expect(spysetStyle).toHaveBeenCalled();
      expect(spyRemoveStyle).not.toHaveBeenCalled();
    });

    it('setPointAttribute: should call `removeStyle` and `setAttribute` if `isHover` is false', () => {
      const event = { target: { r: '2', fill: 'red' } };

      const spySetAttribute = spyOn(component['renderer'], 'setAttribute');
      const spysetStyle = spyOn(component['renderer'], 'setStyle');
      const spyRemoveStyle = spyOn(component['renderer'], 'removeStyle');

      component['setPointAttribute'](<any>event.target, false);

      expect(spySetAttribute).toHaveBeenCalled();
      expect(spyRemoveStyle).toHaveBeenCalled();
      expect(spysetStyle).not.toHaveBeenCalled();
    });

    it('trackBy: should return index param', () => {
      const index = 1;
      const expectedValue = index;

      expect(component.trackBy(index)).toBe(expectedValue);
    });

    it('displayPointsWithDelay: should return an observable of coordinates and update status after a while', fakeAsync(() => {
      component.animate = true;
      let coordinatesWithDelay: Array<PoChartPointsCoordinates> = [];

      const serieA = {
        category: 'janeiro',
        tooltipLabel: 'Vancouver: 200',
        label: 'Vancouver',
        data: 200,
        xCoordinate: 200,
        yCoordinate: 200
      };
      const serieB = {
        category: 'fevereiro',
        tooltipLabel: 'Vancouver: 300',
        label: 'Vancouver',
        data: 300,
        xCoordinate: 300,
        yCoordinate: 300
      };

      spyOn(UtilsFunction, 'isIE').and.returnValue(false);

      const subscription = component['displayPointsWithDelay']([serieA, serieB]).subscribe(value => {
        coordinatesWithDelay = value;
      });

      tick();
      expect(coordinatesWithDelay.length).toBe(1);
      expect(coordinatesWithDelay).toEqual([serieA]);

      tick(700);
      expect(coordinatesWithDelay.length).toBe(2);
      expect(coordinatesWithDelay).toEqual([serieA, serieB]);
      expect(component['animationState']).toBeFalsy();

      subscription.unsubscribe();
    }));

    it('displayPointsWithDelay: shuold return an observable without any delay if animationState is false', fakeAsync(() => {
      component['animationState'] = false;
      let delayedCoordinates: Array<PoChartPointsCoordinates> = [];

      const serieA = {
        category: 'janeiro',
        tooltipLabel: 'Vancouver: 200',
        label: 'Vancouver',
        data: 200,
        xCoordinate: 200,
        yCoordinate: 200
      };
      const serieB = {
        category: 'fevereiro',
        tooltipLabel: 'Vancouver: 300',
        label: 'Vancouver',
        data: 300,
        xCoordinate: 300,
        yCoordinate: 300
      };

      spyOn(UtilsFunction, 'isIE').and.returnValue(false);

      const subscription = component['displayPointsWithDelay']([serieA, serieB]).subscribe(value => {
        delayedCoordinates = value;
      });

      tick();
      expect(delayedCoordinates.length).toBe(2);
      expect(component['animationState']).toBeFalsy();

      subscription.unsubscribe();
    }));

    it('displayPointsWithDelay: shuold return an observable without any delay if isIE is true', fakeAsync(() => {
      let delayedCoordinates: Array<PoChartPointsCoordinates> = [];

      const serieA = {
        category: 'janeiro',
        tooltipLabel: 'Vancouver: 200',
        label: 'Vancouver',
        data: 200,
        xCoordinate: 200,
        yCoordinate: 200
      };
      const serieB = {
        category: 'fevereiro',
        tooltipLabel: 'Vancouver: 300',
        label: 'Vancouver',
        data: 300,
        xCoordinate: 300,
        yCoordinate: 300
      };

      spyOn(UtilsFunction, 'isIE').and.returnValue(true);

      const subscription = component['displayPointsWithDelay']([serieA, serieB]).subscribe(value => {
        delayedCoordinates = value;
      });

      tick();
      expect(delayedCoordinates.length).toBe(2);
      expect(component['animationState']).toBeTruthy();

      subscription.unsubscribe();
    }));
  });

  describe('Properties', () => {
    it('p-coordinates: should call `displayPointsWithDelay`', () => {
      const spyDisplayPointsWithDelay = spyOn(component, <any>'displayPointsWithDelay');

      component.coordinates = [coordinates];

      expect(spyDisplayPointsWithDelay).toHaveBeenCalledWith(component.coordinates);
    });
  });

  describe('Template:', () => {
    it('should contain `po-chart-line-point`', () => {
      spyOn(component, <any>['displayPointsWithDelay']).and.returnValue(of(component.coordinates));
      component.coordinates = [coordinates];

      fixture.detectChanges();

      const chartPoints = nativeElement.querySelectorAll('.po-chart-line-point');

      expect(chartPoints).toBeTruthy();
      expect(chartPoints.length).toBe(1);
    });
  });
});
