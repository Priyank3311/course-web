import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student';
import { CourseResponseDto } from '../../../models/course.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../../shared/services/snack-bar';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-available-courses',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './available-courses.html',
  styleUrl: './available-courses.scss'
})
export class AvailableCourses implements OnInit {
  courses: CourseResponseDto[] = [];
  filteredCourses: CourseResponseDto[] = [];
  searchText: string = '';

  constructor(private studentService: StudentService, private snackBar: SnackBarService,private auth:AuthService) { }
  ngOnInit(): void {
    this.loadCourses();
    if (this.auth.getJustLoggedIn()) {
      this.auth.setJustLoggedIn(false);
      const username = this.auth.getLoggedInUsername();
      this.snackBar.Success(`Welcome, ${username}!`);
    }
  }

  loadCourses() {
    this.studentService.getAvailableCourses().subscribe((res) => {
      this.courses = res.data;
      this.filteredCourses = res.data;
    });
  }

  filterCourses() {
    const term = this.searchText.trim().toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.courseName.toLowerCase().includes(term) ||
      course.department.toLowerCase().includes(term)
    );
  }

  enroll(courseId: number) {
    this.studentService.enroll({ courseId }).subscribe({
      next: (res) => {
        if (res.data) {
          this.snackBar.Success('Enrolled successfully!');
          this.loadCourses();
        } else {
          this.snackBar.Error(res.error_message || 'Already enrolled');
        }
      },
      error: (err) => {
        console.error('Enrollment error:', err);
        const message = err.error?.error_message || err.message || 'Enrollment failed';
        this.snackBar.Error(message);
      }
    });
  }

}
