import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: '[po-chart-circular-animation]',
  templateUrl: './po-chart-circular-animation.component.svg'
})
export class PoChartCircularAnimationComponent implements OnChanges {
  circumference: number;
  radius: number;
  circlePosition: number;
  circleTransform: string;
  strokeDasharray: string;

  vai = false;

  @Input('p-height') height: number;

  @Input('p-animate') animate: string;
  @Input('p-coordinates') coordinates: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES no animation:::', changes);
    if (changes.coordinates) {
      this.vai = !this.vai;
      // this.vai = true;
      this.setCircleProperties(this.height);

      console.log('mudou ufa abimate!!!!');
    }
  }

  private setCircleProperties(height: number) {
    void this.elementRef.nativeElement.offsetWidth;

    this.radius = height / 4;
    this.circlePosition = height / 2;

    this.circleTransform = `scale(-1,1) translate(-${height},0) rotate(-90, ${this.circlePosition}, ${this.circlePosition})`;
    this.circumference = 2 * Math.PI * this.radius;
    // valor deve ser equivalente à circunferência do círculo
    this.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.vai = !this.vai;
  }
}
