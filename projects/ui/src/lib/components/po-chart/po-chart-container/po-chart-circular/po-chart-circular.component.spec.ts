import { ChangeDetectorRef, Component, NgZone, NO_ERRORS_SCHEMA } from '@angular/core';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { PoChartCircularComponent } from './po-chart-circular.component';
import { PoChartColorService } from '../../services/po-chart-color.service';
import { PoChartModule } from '../../po-chart.module';
import { PoChartContainerSize } from '../../interfaces/po-chart-container-size.interface';
import { PoChartType } from '../../enums/po-chart-type.enum';
import { PoChartCircularPathComponent } from './po-chart-circular-path/po-chart-circular-path.component';

@Component({
  selector: 'po-chart-circular-test'
})
class PoChartPieComponent extends PoChartCircularComponent {
  constructor(colorService: PoChartColorService, ngZone: NgZone, changeDetector: ChangeDetectorRef) {
    super(colorService, ngZone, changeDetector);
  }

  getTooltipLabel() {}
  calculateCoordinates() {}
}

fdescribe('PoChartCircularComponent', () => {
  let component: PoChartPieComponent;
  let fixture;

  const colorList = ['#0C6C94', '#29B6C5'];

  const series = [
    { label: 'category A', data: 10 },
    { label: 'category B', data: 20 }
  ];

  const containerSize: PoChartContainerSize = {
    svgWidth: 200,
    svgHeight: 200,
    svgPlottingAreaWidth: 20,
    svgPlottingAreaHeight: 20
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PoChartModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartPieComponent);
    component = fixture.componentInstance;
    component.containerSize = containerSize;
    component['colorList'] = colorList;

    fixture.detectChanges();
  });

  it('should be create', () => {
    expect(component instanceof PoChartPieComponent).toBeTruthy();
    expect(component instanceof PoChartCircularComponent).toBeTruthy();
  });

  fdescribe('Methods:', () => {
    it('onSerieClick: should emit `circularClick`', () => {
      const selectedItem = { label: 'cat', data: 200 };

      const spyCircularClick = spyOn(component.circularClick, 'emit');

      component.onSerieClick(selectedItem);

      expect(spyCircularClick).toHaveBeenCalledWith(selectedItem);
    });

    it('onSerieHover: should emit `circularHover`', () => {
      const selectedItem = { label: 'cat', data: 200 };

      const spyCircularHover = spyOn(component.circularHover, 'emit');

      component.onSerieHover(selectedItem);

      expect(spyCircularHover).toHaveBeenCalledWith(selectedItem);
    });

    it('drawSeries: should call `calculateTotalValue`, `validateSeries`, `detectChanges` and `initDrawPaths` if totalValue is greater than zero', () => {
      const spyCalculateTotalValue = spyOn(component, <any>'calculateTotalValue').and.callThrough();
      const spyValidateSeries = spyOn(component, <any>'validateSeries').and.callThrough();
      const spyChangeDetector = spyOn(component['changeDetector'], <any>'detectChanges');
      const spyInitDrawPaths = spyOn(component, <any>'initDrawPaths');

      component['drawSeries'](series, containerSize.svgHeight);

      expect(spyCalculateTotalValue).toHaveBeenCalledWith(series);
      expect(spyValidateSeries).toHaveBeenCalledWith(series);
      expect(spyChangeDetector).toHaveBeenCalled();
      expect(spyInitDrawPaths).toHaveBeenCalledWith(
        component.seriesList,
        component['totalValue'],
        containerSize.svgHeight
      );
    });

    it('drawSeries: shouldn`t call `validateSeries`, `detectChanges` neither `initDrawPaths` if totalValue is  zero', () => {
      const mockSeries = [{ label: 'category A', data: -10 }];

      const spyValidateSeries = spyOn(component, <any>'validateSeries');
      const spyChangeDetector = spyOn(component['changeDetector'], <any>'detectChanges');
      const spyInitDrawPaths = spyOn(component, <any>'initDrawPaths');

      component['drawSeries'](mockSeries, containerSize.svgHeight);

      expect(spyValidateSeries).not.toHaveBeenCalled();
      expect(spyChangeDetector).not.toHaveBeenCalled();
      expect(spyInitDrawPaths).not.toHaveBeenCalled();
    });

    it('drawSeries: shouldn`t call `initDrawPaths` if seriesList doesn`t have length', () => {
      const mockSeries = [{ label: 'category A', data: 10 }];

      spyOn(component, <any>'validateSeries').and.returnValue([]);
      spyOn(component['changeDetector'], <any>'detectChanges');
      const spyInitDrawPaths = spyOn(component, <any>'initDrawPaths');

      component['drawSeries'](mockSeries, containerSize.svgHeight);

      expect(spyInitDrawPaths).not.toHaveBeenCalled();
    });

    fit('calculateSerieCoordinates: should call `calculateAngle`, `calculateCoordinates` and `applyCoordinates`', () => {
      // const fakeThis = {
      //   calculateAngle: () => {},
      //   calculateCoordinates: () => {},
      //   svgPaths: {
      //     toArray: () => {return [{
      //       applyCoordinates: () => {}
      //     }]},
      //   },
      //   showLabels: false
      // }
      // const spyCalculateAngle = spyOn(fakeThis, 'calculateAngle');
      // const spyCalculateCoordinates = spyOn(fakeThis, 'calculateCoordinates');
      // const spyToArray = spyOn(fakeThis.svgPaths, 'toArray');
      // const spyApplyCoordinates = spyOn(fakeThis.svgPaths.toArray, <any>'applyCoordinates');
      // component['calculateSerieCoordinates'].call(fakeThis, series, component['totalValue'], containerSize.svgHeight);
      // expect(spyCalculateAngle).toHaveBeenCalled();
      // expect(spyCalculateCoordinates).toHaveBeenCalled();
      // component.seriesList = [{ coordinates: 'M50 L70 10', label: 'category A', data: 10 }];
      // component['svgPaths'] = <any>svgPaths;
      // const spyCalculateAngle = spyOn(component, <any>'calculateAngle').and.callThrough();
      // const spyCalculateCoordinates = spyOn(component, <any>'calculateCoordinates').and.callThrough();
      // spyOn(component['svgPaths'], <any>'toArray').and.callThrough();
      // jasmine.createSpyObj('PoChartCircularPathComponent', ['toArray', 'applyCoordinates']);
      // component['calculateSerieCoordinates'](series, component['totalValue'], containerSize.svgHeight)
      // expect(spyCalculateAngle).toHaveBeenCalledWith({ label: 'category A', data: 10 }, component['totalValue']);
      // expect(spyCalculateCoordinates).toHaveBeenCalled();
      // expect(component.showLabels).toBeTruthy();
      // expect(svgPaths.applyCoordinates).toHaveBeenCalled();
    });

    it('initDrawPaths: should call `calculateSerieCoordinates` if animate is false', () => {
      component['animate'] = false;

      const spyCalculateSerieCoordinates = spyOn(component, <any>'calculateSerieCoordinates');
      const spyCalculateCoordinatesWithAnimation = spyOn(component, <any>'calculateCoordinatesWithAnimation');

      component['initDrawPaths'](series, component['totalValue'], containerSize.svgHeight);

      expect(spyCalculateSerieCoordinates).toHaveBeenCalled();
      expect(spyCalculateCoordinatesWithAnimation).not.toHaveBeenCalled();
    });

    it('initDrawPaths: should call `calculateCoordinatesWithAnimation` if animate is true', () => {
      component['animate'] = true;

      const spyCalculateSerieCoordinates = spyOn(component, <any>'calculateSerieCoordinates');
      const spyCalculateCoordinatesWithAnimation = spyOn(component, <any>'calculateCoordinatesWithAnimation');

      component['initDrawPaths'](series, component['totalValue'], containerSize.svgHeight);

      expect(spyCalculateSerieCoordinates).not.toHaveBeenCalled();
      expect(spyCalculateCoordinatesWithAnimation).toHaveBeenCalled();
    });

    it('validateSeries: should call `getTooltipLabel` and return an array with valid series', () => {
      const result = [
        { data: 10, color: '#0C6C94', label: 'category A', tooltipLabel: 'label' },
        { data: 20, color: '#29B6C5', label: 'category B', tooltipLabel: 'label' }
      ];

      const spyGetTooltipLabel = spyOn(component, <any>'getTooltipLabel').and.returnValue('label');

      const expectedResult = component['validateSeries'](series);

      expect(spyGetTooltipLabel).toHaveBeenCalled();
      expect(expectedResult).toEqual(result);
    });

    it('validateSeries: shouldn`t call `getTooltipLabel` if data is lower than 0', () => {
      const seriesList = [{ label: 'category', data: -10 }];

      const spyGetTooltipLabel = spyOn(component, <any>'getTooltipLabel');

      const expectedResult = component['validateSeries'](seriesList);

      expect(spyGetTooltipLabel).not.toHaveBeenCalled();
      expect(expectedResult).toEqual([]);
    });
  });

  describe('Properties:', () => {
    it('p-series: should apply value to `animate` and `colorList`', () => {
      const type = PoChartType.Pie;
      const seriesColors = ['#0C6C94', '#29B6C5'];
      const spyGetSeriesColor = spyOn(component['colorService'], 'getSeriesColor').and.callThrough();

      component.series = series;

      expect(spyGetSeriesColor).toHaveBeenCalledWith(component.series, type);
      expect(component['colorList']).toEqual(seriesColors);
      expect(component['animate']).toBe(true);
    });
  });
});
