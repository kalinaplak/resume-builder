import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  template: `
    <div class="flex">
      <div [style.borderBottom]="'solid '+ height + ' ' + color" [style.width]="progress + '%'"></div>
      <div [style.borderBottom]="'solid '+ height + ' ' + bgColor" [style.width]="(100 - progress)+ '%'"></div>
    </div>
  `
})

export class ProgressBarComponent {
  @Input({ required: true }) progress: number = 0;
  @Input() color: string = 'black';
  @Input() bgColor: string = 'lightgray';
  @Input() height: string = '3px';
}