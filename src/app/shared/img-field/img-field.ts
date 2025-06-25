import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-img-field',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './img-field.html',
  styleUrl: './img-field.scss'
})
export class ImgField {
  @Input() form!: FormGroup;
  @Input() formControlModel!: any;

  @Output() onDrop = new EventEmitter<DragEvent>();
  @Output() onDragover = new EventEmitter<DragEvent>();
  @Output() onFileChange = new EventEmitter<Event>();
  @Output() onPreviewClick = new EventEmitter();
}
