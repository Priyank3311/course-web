import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ButtonControlModel } from '../../interfaces/form-control-model';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './common-button.html',
  styleUrls: ['./common-button.scss']
})
export class CommonButtonComponent {
  @Input() buttonControlModel!: ButtonControlModel;
  @Input() isDisabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();
}
