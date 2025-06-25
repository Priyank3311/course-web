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
import { HubService } from '../../../shared/hub-service/hub.service'
import {TextControllComponent} from '../../../shared/modules/form-control/components/text-controll.component/text-controll.component';
import {CommonButtonComponent} from '../../../shared/modules/form-control/components/common-button/common-button';
import {ImgField} from '../../../shared/img-field/img-field';
import {CourseFormControls,CourseFormButton} from '../../../shared/modules/form-control/static/button.config'
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TextControllComponent,
    CommonButtonComponent,
    ImgField

  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm implements OnInit {
  form!: FormGroup;
  isEdit: boolean = false;
  courseId: number = 0;


  formControls = CourseFormControls;
  buttonControls = CourseFormButton;

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
    this.formControls.courseImage.previewUrl = '';
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
      content: ['', [Validators.required, Validators.minLength(5)]],
      courseImage: ['']
    });
  }

  loadCourse(id: number) {
    this.adminService.getCourse(id).subscribe((res) => {
      const data = res.data;
      this.form.patchValue(data);
      console.log("some data",data);
      if (data.imagePath) {
        this.formControls.courseImage.previewUrl = `http://localhost:5070/${data.imagePath}`;
      }
    });
  }

  onFileDropped(event: DragEvent) {
    const file = (event.dataTransfer?.files || [])[0];
    this.handleFile(file);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.formControls.courseImage.previewUrl = reader.result as string;
      this.form.patchValue({ courseImage: file });
    };
    reader.readAsDataURL(file);
  }

  removePreviewUrl() {
    this.formControls.courseImage.previewUrl = '';
    this.form.patchValue({ courseImage: null });
  }


  // submit() {
  //   if (this.form.invalid) return;

  //   const dto: CourseRequestDto = this.form.value;
  //   const formData = new FormData();
  //   formData.append('courseName', this.form.value.courseName);
  //   formData.append('department', this.form.value.department);
  //   formData.append('credits', this.form.value.credits.toString());
  //   formData.append('content', this.form.value.content);

  //   if (this.isEdit) {
  //     this.adminService.updateCourse(this.courseId, dto).subscribe({
  //       next: () => {
  //         this.snackBar.Success('Course updated successfully');
  //         this.hubService.refreshStudentCourses();
  //         this.router.navigate(['/admin/dashboard']);
  //       },
  //       error: (err) => {
  //         this.snackBar.Error(err?.error?.error_message || 'Update failed');
  //       }
  //     });
  //   } else {
  //     this.adminService.addCourse(dto).subscribe({
  //       next: () => {
  //         this.snackBar.Success('Course added successfully');
  //         this.router.navigate(['/admin/dashboard']);
  //       },
  //       error: (err) => {
  //         this.snackBar.Error(err?.error?.error_message || 'Add failed');
  //       }
  //     });
  //   }
  // }

  submit() {
    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('courseName', this.form.value.courseName);
    formData.append('department', this.form.value.department);
    formData.append('credits', this.form.value.credits.toString());
    formData.append('content', this.form.value.content);

    const courseImageFile: File = this.form.get('courseImage')?.value;
    if (courseImageFile) {
      formData.append('courseImage', courseImageFile);
    }

    if (this.isEdit) {
      this.adminService.updateCourse(this.courseId, formData).subscribe({
        next: () => {
          this.snackBar.Success('Course updated successfully');
          this.hubService.refreshStudentCourses();
          this.router.navigate(['/admin/dashboard']);
          this.formControls.courseImage.previewUrl = '';
        },
        error: (err) => {
          this.snackBar.Error(err?.error?.error_message || 'Update failed');
        }
      });
    } else {
      this.adminService.addCourse(formData).subscribe({
        next: () => {
          this.snackBar.Success('Course added successfully');
          this.router.navigate(['/admin/dashboard']);
          this.formControls.courseImage.previewUrl = '';
        },
        error: (err) => {
          this.snackBar.Error(err?.error?.error_message || 'Add failed');
        }
      });
    }
  }

}
