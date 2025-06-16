import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin';
import { CourseResponseDto } from '../../../models/course.model';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../../shared/services/snack-bar';
import { CommonModule } from '@angular/common';
import { ViewStudentsDialog } from '../view-students-dialog/view-students-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {  MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  courses: CourseResponseDto[] = [];
  searchText: string = '';
  page: number = 1;
  size: number = 5;
  totalcount: number = 0;
  selectedDept: string = '';
  departmentList: string[] = ['IT', 'HR', 'Marketing', 'Finance'];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    // this.adminService.getCourses().subscribe((res) => {
    //   this.courses = res.data;
    // });
    this.adminService.getPagedCourses(this.searchText, this.page, this.size).subscribe((res) => {
      this.courses = res.data;
      console.log('Courses:', this.courses);
      this.totalcount = res.data?.[0]?.totalCount || 0;
    });
  }
  onSearch() {
    this.page = 1;
    this.loadCourses();
  }
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.size = event.pageSize;
    this.loadCourses();
  }

  edit(id: number) {
    this.router.navigate(['/admin/edit', id]);
  }

  delete(id: number) {
    this.adminService.deleteCourse(id).subscribe({
      next: (res) => {
        if (res.data) {
          this.snackBar.Success('Course deleted');
          this.loadCourses();
        } else {

          this.snackBar.Warning(res.error_message || 'Cannot delete course');
        }
      },
      error: (err) => {
        console.log('Deletion error:', err);
        const message = err?.error?.success_message || 'Deletion failed due to server error';
        this.snackBar.Warning(message);
      }
    });
  }

  add() {
    this.router.navigate(['/admin/add-course']);
  }

  viewStudents(courseId: number) {
    this.dialog.open(ViewStudentsDialog, {
      data: courseId,
      width: '600px'
    });
  }
}
