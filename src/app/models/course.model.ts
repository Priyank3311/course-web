export interface CourseResponseDto {
  id: number;
  courseName: string;
  department: string;
  credits: number;
  totalCount : number;
  content: string;
}

export interface EnrollRequestDto {
  courseId: number;
}

export interface EnrollmentResponseDto {
  enrollmentId: number;
  courseId: number;
  coursename: string;
  department: string;
  credits: number;
  isCompleted: boolean;
}
export interface CourseRequestDto {
  coursename: string;
  department: string;
  credits: number;
  content: string;
}
