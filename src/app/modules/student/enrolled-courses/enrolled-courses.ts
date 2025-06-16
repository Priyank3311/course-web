import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../services/student';
import { EnrollmentResponseDto } from '../../../models/course.model';
import { SnackBarService } from '../../../shared/services/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-enrolled-courses',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './enrolled-courses.html',
  styleUrls: ['./enrolled-courses.scss']
})
export class EnrolledCoursesComponent implements OnInit {
  courses: EnrollmentResponseDto[] = [];

  constructor(
    private studentService: StudentService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loadMyCourses();
  }

  loadMyCourses() {
    this.studentService.getMyCourses().subscribe((res) => {
      this.courses = res.data;
    });
  }

  markComplete(courseId: number) {
    this.studentService.markAsCompleted(courseId).subscribe((res) => {
      if (res.data) {
        this.snackBar.Success('Course marked as completed!');
        this.loadMyCourses();
      } else {
        this.snackBar.Error(res.error_message || 'Failed to mark as completed');
      }
    });
  }
}
