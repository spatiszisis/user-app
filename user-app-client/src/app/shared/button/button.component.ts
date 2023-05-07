import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonStyle } from 'src/app/models/button-style.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  text: string;
  @Input()
  style: string;
  @Input()
  loading: boolean;
  @Output()
  submit: EventEmitter<void> = new EventEmitter();

  buttonStyle = ButtonStyle;

  constructor() { }

}
