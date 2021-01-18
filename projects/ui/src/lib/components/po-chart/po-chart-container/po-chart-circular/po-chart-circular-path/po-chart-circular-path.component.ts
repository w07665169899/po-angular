import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { PoChartPathCoordinates } from '../../../interfaces/po-chart-path-coordinates.interface';

@Component({
  selector: '[po-chart-circular-path]',
  templateUrl: './po-chart-circular-path.component.svg'
})
export class PoChartCircularPathComponent implements OnChanges {
  @Input('p-coordinates') coordinates: PoChartPathCoordinates;

  @Output('p-on-click') onClick = new EventEmitter<any>();

  @Output('p-on-hover') onHover = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES no path:::', changes);
    if (changes.coordinaes) {
      console.log('mudou ufa no path!!!!');
    }
  }

  onMouseClick() {
    const { label, data } = this.coordinates;

    this.onClick.emit({ label, data });
  }

  onMouseEnter() {
    const { label, data } = this.coordinates;

    this.onHover.emit({ label, data });
  }
}
