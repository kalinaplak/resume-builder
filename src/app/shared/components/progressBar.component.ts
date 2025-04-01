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
  @Input({ required: true }) progress = 0;
  @Input() color = 'black';
  @Input() bgColor = 'lightgray';
  @Input() height = '3px';
}