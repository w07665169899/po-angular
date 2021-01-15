import { Component, Input } from '@angular/core';

import { PoChartLabelCoordinates } from '../../../interfaces/po-chart-label-coordinates.interface';

@Component({
  selector: '[po-chart-circular-label]',
  templateUrl: './po-chart-circular-label.component.svg'
})
export class PoChartCircularLabelComponent {
  textColor: string;

  @Input('p-coordinates') coordinates: PoChartLabelCoordinates;
}
