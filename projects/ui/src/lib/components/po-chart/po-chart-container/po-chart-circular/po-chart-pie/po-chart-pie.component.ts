import { Component } from '@angular/core';

import { PoChartCompleteCircle } from '../../../helpers/po-chart-default-values.constant';

import { PoChartCircularComponent } from '../po-chart-circular.component';

@Component({
  selector: '[po-chart-pie]',
  templateUrl: '../po-chart-circular.component.svg'
})
export class PoChartPieComponent extends PoChartCircularComponent {
  protected calculateCoordinates(dataValue) {
    const { height, startRadianAngle, endRadianAngle } = dataValue;

    const radius = height / 2;

    const sinAlpha = Math.sin(startRadianAngle);
    const cosAlpha = Math.cos(startRadianAngle);

    const sinBeta = Math.sin(endRadianAngle);
    const cosBeta = Math.cos(endRadianAngle);

    const startX = radius + cosAlpha * radius;
    const startY = radius + sinAlpha * radius;

    const endX = radius + cosBeta * radius - PoChartCompleteCircle;
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

  protected getTooltipLabel(data: number, totalValue: number, label?: string, tooltipLabel?: string) {
    const dataLabel = label ? `${label}: ` : '';
    const dataValue = data.toString();

    return tooltipLabel || `${dataLabel}${dataValue}`;
  }
}
