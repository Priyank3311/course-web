import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { CourseRequestDto, CourseResponseDto } from '../models/course.model';
import { ResponseModel } from '../models/response.model';
import { StudentInCourseDto } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getCourses() {
    return this.get<ResponseModel<CourseResponseDto[]>>('/course');
  }

  getCourse(id: number) {
    return this.get<ResponseModel<CourseResponseDto>>(`/course/${id}`);
  }

  addCourse(dto: CourseRequestDto) {
    return this.add<CourseRequestDto, ResponseModel<CourseResponseDto>>('/course', dto);
  }

  updateCourse(id: number, dto: CourseRequestDto) {
    return this.update<CourseRequestDto, ResponseModel<boolean>>(`/course/${id}`, dto);
  }

  deleteCourse(id: number) {
    return this.remove<ResponseModel<boolean>>(`/course/${id}`);
  }

  getEnrolledStudents(courseId: number) {
    return this.get<ResponseModel<StudentInCourseDto[]>>(`/course/${courseId}/students`);
  }
  getPagedCourses(search: string = '', page: number = 1, size: number = 5) {
    return this.get<ResponseModel<CourseResponseDto[]>>(
      `/Course/course?search=${search}&page=${page}&size=${size}`
    );
  }


}