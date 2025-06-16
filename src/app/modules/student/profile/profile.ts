import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../services/student';
import { StudentProfileDto } from '../../../models/student.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  profile!: StudentProfileDto;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getProfile().subscribe((res) => {
      this.profile = res.data;
    });
  }
}
