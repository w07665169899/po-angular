import { Component } from '@angular/core';

import { convertNumberToDecimal } from '../../../../../utils/util';
import { PoSeriesTextBlack } from '../../../helpers/po-chart-colors.constant';
import { PoChartCompleteCircle, PoChartDonutThickness } from '../../../helpers/po-chart-default-values.constant';

import { PoChartCircularComponent } from '../po-chart-circular.component';

@Component({
  selector: '[po-chart-donut]',
  templateUrl: '../po-chart-circular.component.svg'
})
export class PoChartDonutComponent extends PoChartCircularComponent {
  private readonly poChartBlackColor = '#000000';
  private readonly poChartWhiteColor = '#ffffff';

  protected calculateCoordinates(dataValue) {
    const { height, startRadianAngle, endRadianAngle, data, totalValue, color } = dataValue;

    const radius = height / 2;

    const sinAlpha = Math.sin(startRadianAngle);
    const cosAlpha = Math.cos(startRadianAngle);

    const sinBeta = Math.sin(endRadianAngle);
    const cosBeta = Math.cos(endRadianAngle);

    const startX = radius + cosAlpha * radius;
    const startY = radius + sinAlpha * radius;

    const endX = radius + cosBeta * radius - PoChartCompleteCircle;
    const endY = radius + sinBeta * radius;

    const innerRadius = radius - PoChartDonutThickness;

    const startInnerX = radius + cosAlpha * innerRadius;
    const startInnerY = radius + sinAlpha * innerRadius;

    const endInnerX = radius + cosBeta * innerRadius - PoChartCompleteCircle;
    const endInnerY = radius + sinBeta * innerRadius;

    const largeArc = endRadianAngle - startRadianAngle > Math.PI;

    this.calculateLabelCoordinates({ startRadianAngle, endRadianAngle, radius, innerRadius, data, totalValue, color });

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
      endInnerX,
      endInnerY,
      'A',
      innerRadius,
      innerRadius,
      0,
      largeArc ? '1,0' : '0,0',
      startInnerX,
      startInnerY,
      'Z'
    ].join(' ');
  }

  protected getTooltipLabel(data: number, totalValue: number, label?: string, tooltipLabel?: string) {
    const dataLabel = label ? `${label}: ` : '';
    const dataValue = this.getPercentValue(data, totalValue) + '%';

    return tooltipLabel || `${dataLabel}${dataValue}`;
  }

  private calculateLabelCoordinates(dataValue) {
    const { startRadianAngle, endRadianAngle, radius, innerRadius, data, totalValue, color } = dataValue;

    const sliceCenterAngle = (startRadianAngle + endRadianAngle) / 2;
    const labelRadius = innerRadius + +(PoChartDonutThickness / 2);

    const xCoordinate = labelRadius * Math.cos(sliceCenterAngle) + radius;
    const yCoordinate = labelRadius * Math.sin(sliceCenterAngle) + radius;

    this.labelsCoordinates = [
      ...this.labelsCoordinates,
      {
        xCoordinate,
        yCoordinate,
        label: this.getPercentValue(data, totalValue) + '% ',
        color: this.getTextColor(color)
      }
    ];
  }

  private getPercentValue(value: number, totalValue: number) {
    const percentValue = (value / totalValue) * 100;
    const floatPercentValue = convertNumberToDecimal(percentValue, 2);

    return String(floatPercentValue).replace('.', ',');
  }

  private getTextColor(color: string) {
    if (PoSeriesTextBlack.includes(color)) {
      return this.poChartBlackColor;
    }

    return this.poChartWhiteColor;
  }
}
