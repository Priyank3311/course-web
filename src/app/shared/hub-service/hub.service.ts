import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { CourseResponseDto } from '../../models/course.model';

@Injectable({ providedIn: 'root' })
export class HubService {
  private hubConnection!: signalR.HubConnection;

  createConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseURL.replace('/api', '')}/hubs/course`, {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    return this.hubConnection.start().catch(err => console.error('SignalR error:', err));
  }

  onNewCourse(callback: (course: CourseResponseDto) => void) {
    this.hubConnection.on('NewCourseAdded', (course: CourseResponseDto) => {
      console.log('📡 Received new course via SignalR:', course);
      callback(course);
    });
  }

  refreshStudentCourses() {
    return this.hubConnection.invoke('RefreshStudentCourses');
  }

  onRefreshStudentCourses(callback: () => void) {
    this.hubConnection.on('RefreshStudentCourses', () => {
      callback();
    });
  }

  // onCourseUpdated(callback: (course: CourseResponseDto) => void) {
  //   this.hubConnection.on('CourseUpdated', (course: CourseResponseDto) => {
  //     callback(course);
  //   });
  // }

  // onCourseDeleted(callback: (courseId: number) => void) {
  //   this.hubConnection.on('CourseDeleted', (courseId: number) => {
  //     callback(courseId);
  //   });
  // }
}
