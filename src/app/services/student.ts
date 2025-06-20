import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { CourseResponseDto, EnrollmentResponseDto, EnrollRequestDto } from '../models/course.model';
import { ResponseModel } from '../models/response.model';
import { StudentProfileDto } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getAvailableCourses() {
    return this.get<ResponseModel<CourseResponseDto[]>>('/Student/available-courses');
  }

  enroll(dto: EnrollRequestDto) {
    return this.add<EnrollRequestDto, ResponseModel<boolean>>('/student/enroll', dto);
  }
  getMyCourses() {
    return this.get<ResponseModel<EnrollmentResponseDto[]>>('/student/my-courses');
  }

  markAsCompleted(courseId: number) {
    return this.add<{ courseId: number }, ResponseModel<boolean>>('/student/complete', { courseId });
  }

  getProfile() {
    return this.get<ResponseModel<StudentProfileDto>>('/student/profile');
  }
  getCourse(id: number) {
    return this.get<ResponseModel<CourseResponseDto>>(`/course/${id}`);
  }
}
