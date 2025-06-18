import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin';
import { SnackBarService } from '../../../shared/services/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseRequestDto } from '../../../models/course.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HubService } from '../../../shared/services/hub-service/hub.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm implements OnInit {
  form!: FormGroup;
  isEdit: boolean = false;
  courseId: number = 0;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: SnackBarService,
    private route: ActivatedRoute,
    private router: Router,
    private hubService: HubService
  ) {
    hubService.createConnection().catch(err => {
      console.error('SignalR connection error:', err);
      this.snackBar.Error('Failed to connect to real-time updates');
    });
  }

  ngOnInit(): void {
    this.buildForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.courseId = +idParam;
      this.loadCourse(this.courseId);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      department: ['', [Validators.required]],
      credits: [1, [Validators.required, Validators.min(1)]],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  loadCourse(id: number) {
    this.adminService.getCourse(id).subscribe((res) => {
      this.form.patchValue(res.data);
    });
  }

  submit() {
    if (this.form.invalid) return;

    const dto: CourseRequestDto = this.form.value;

    if (this.isEdit) {
      this.adminService.updateCourse(this.courseId, dto).subscribe({
        next: () => {
          this.snackBar.Success('Course updated successfully');
          this.hubService.refreshStudentCourses();
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.snackBar.Error(err?.error?.error_message || 'Update failed');
        }
      });
    } else {
      this.adminService.addCourse(dto).subscribe({
        next: () => {
          this.snackBar.Success('Course added successfully');
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.snackBar.Error(err?.error?.error_message || 'Add failed');
        }
      });
    }
  }
}
