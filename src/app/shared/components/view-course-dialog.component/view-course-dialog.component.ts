import { Component,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogActions,MatDialogContent } from '@angular/material/dialog';
import {CourseResponseDto} from '../../../models/course.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-view-course-dialog.component',
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatButtonModule,MatDialogActions,MatDialogContent],
  templateUrl: './view-course-dialog.component.html',
  styleUrl: './view-course-dialog.component.scss'
})
export class ViewCourseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public course: CourseResponseDto
  ) {}
  close(): void {
    this.dialogRef.close(false);
  }

  confirmEnroll(): void {
    this.dialogRef.close(true);
  }
}
