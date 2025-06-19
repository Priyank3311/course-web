import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup,ReactiveFormsModule,ControlContainer  } from '@angular/forms';
import { FormControlModel } from '../../interfaces/form-control-model';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@Component({
  selector: 'app-text-control',
  imports: [MatInput,MatFormField,MatLabel,MatError,MatIcon, CommonModule,MatFormFieldModule,ReactiveFormsModule,MatSelectModule,MatOptionModule],
  templateUrl: './text-controll.component.html',
  styleUrl: './text-controll.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: ControlContainer }]
})
export class TextControllComponent {
  @Input() form!: FormGroup;
  @Input() formControlModel!: FormControlModel;
  @Output() iconClick = new EventEmitter<void>();
  @Output() keyupEvent = new EventEmitter<KeyboardEvent>();

  get control() {
    return this.form.get(this.formControlModel.key);
  }

  onIconClick() {
    this.iconClick.emit();
  }
}
