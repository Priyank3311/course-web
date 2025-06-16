import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin';
import { StudentInCourseDto } from '../../../models/enrollment.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-students-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule],
  templateUrl: './view-students-dialog.html',
  styleUrl: './view-students-dialog.scss'
})
export class ViewStudentsDialog implements OnInit {
  students: StudentInCourseDto[] = [];

  constructor(
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public courseId: number
  ) { }

  ngOnInit(): void {
    this.adminService.getEnrolledStudents(this.courseId).subscribe((res) => {
      this.students = res.data;
    });
  }
}
