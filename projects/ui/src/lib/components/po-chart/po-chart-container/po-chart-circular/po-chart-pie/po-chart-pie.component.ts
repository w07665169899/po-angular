import { Component, OnChanges, SimpleChanges } from '@angular/core';

import { PoChartCircularComponent } from '../po-chart-circular.component';

@Component({
  selector: '[po-chart-pie]',
  templateUrl: '../po-chart-circular.component.svg'
})
export class PoChartPieComponent extends PoChartCircularComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.series || changes.containerSize) {
      this.drawSeries(this.series, this.containerSize.svgHeight);
    }
  }

  protected calculateCoordinates(dataValue) {
    const { height, startRadianAngle, endRadianAngle } = dataValue;

    const radius = height / 2;

    const sinAlpha = Math.sin(startRadianAngle);
    const cosAlpha = Math.cos(startRadianAngle);

    const sinBeta = Math.sin(endRadianAngle);
    const cosBeta = Math.cos(endRadianAngle);

    const startX = radius + cosAlpha * radius;
    const startY = radius + sinAlpha * radius;

    const endX = radius + cosBeta * radius;
    const endY = radius + sinBeta * radius;

    const largeArc = endRadianAngle - startRadianAngle > Math.PI;

    return [
      'M',
      startX,
      startY,
      'A',
      radius,
      radius,
      0,
      largeArc ? '1,1' : '0,1',
      endX,
      endY,
      'L',
      radius,
      radius,
      'Z'
    ].join(' ');
  }

  protected getTooltipLabel(data: number, label?: string, tooltipLabel?: string) {
    const dataLabel = label ? `${label}: ` : '';
    const dataValue = data.toString();

    return tooltipLabel || `${dataLabel}${dataValue}`;
  }
}
