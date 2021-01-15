import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { PoChartStartAngle } from '../../helpers/po-chart-default-values.constant';

import { PoChartColorService } from '../../services/po-chart-color.service';
import { PoChartContainerSize } from '../../interfaces/po-chart-container-size.interface';
import { PoChartMathsService } from '../../services/po-chart-maths.service';
import { PoChartPathCoordinates } from '../../interfaces/po-chart-path-coordinates.interface';
import { PoChartType } from '../../enums/po-chart-type.enum';
import { PoDonutChartSeries } from '../../po-chart-types/po-chart-donut/po-chart-donut-series.interface';
import { PoPieChartSeries } from '../../po-chart-types/po-chart-pie/po-chart-pie-series.interface';
import { PoChartLabelCoordinates } from '../../interfaces/po-chart-label-coordinates.interface';

@Directive()
export abstract class PoChartCircularComponent implements OnChanges {
  private _containerSize: PoChartContainerSize = {};
  private _series: Array<PoPieChartSeries | PoDonutChartSeries>;

  colors: Array<string> = [];
  coordinates: Array<PoChartPathCoordinates>;
  labelsCoordinates: Array<PoChartLabelCoordinates>;
  radius: number;

  private colorList: Array<string>;

  @Input('p-container-size') set containerSize(value: PoChartContainerSize) {
    this._containerSize = value;
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-series') set series(value: Array<PoPieChartSeries | PoDonutChartSeries>) {
    this._series = value;

    this.colorList = this.colorService.getSeriesColor(this.series, PoChartType.Pie);
  }

  get series() {
    return this._series;
  }

  @Output('p-circular-click') circularClick = new EventEmitter<any>();

  @Output('p-circular-hover') circularHover = new EventEmitter<any>();

  constructor(protected colorService: PoChartColorService, protected mathsService: PoChartMathsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((this.containerSize && changes.series) || changes.containerSize) {
      this.cleanProperties();
      this.setCoordinates(this.series, this.containerSize.svgHeight);
    }
  }

  onSerieClick(selectedItem: any) {
    this.circularClick.emit(selectedItem);
  }

  onSerieHover(selectedItem: any) {
    this.circularHover.emit(selectedItem);
  }

  trackBy(index) {
    return index;
  }

  private calculateAngle(data: number, totalValue: number) {
    return (data / totalValue) * (Math.PI * 2);
  }

  private calculateTotalValue(series: Array<PoPieChartSeries | PoDonutChartSeries>) {
    return series.reduce((previousValue, serie) => {
      const data = serie.data ? serie.data : serie.value;

      return previousValue + (data > 0 ? data : 0);
    }, 0);
  }

  private setCoordinates(series: Array<PoPieChartSeries | PoDonutChartSeries>, height: number) {
    const totalValue = this.calculateTotalValue(series);

    if (totalValue && totalValue > 0) {
      let startRadianAngle = PoChartStartAngle;
      let endRadianAngle = PoChartStartAngle;

      this.coordinates = series.reduce((coordinatesList, serie, index) => {
        const data = serie.data ?? serie.value;
        const label = serie.label;
        const tooltipLabel = this.getTooltipLabel(data, totalValue, serie.label, serie.tooltip);

        if (data && data > 0) {
          this.colors = [...this.colors, this.colorList[index]];
          startRadianAngle = endRadianAngle;
          endRadianAngle = startRadianAngle + this.calculateAngle(data, totalValue);
          const coordinates = this.calculateCoordinates({
            height,
            startRadianAngle,
            endRadianAngle,
            data,
            totalValue,
            color: this.colorList[index]
          });

          coordinatesList.push({ coordinates, data, label, tooltipLabel });
        }
        return coordinatesList;
      }, []);
    }
  }

  private cleanProperties() {
    this.labelsCoordinates = [];
    this.colors = [];
    this.coordinates = [];
  }

  protected abstract getTooltipLabel(data, totalValue, label, tooltip);
  protected abstract calculateCoordinates(dataValue);
}
