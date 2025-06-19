import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../services/student';
import { StudentProfileDto } from '../../../models/student.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { WaitingTokenDialog } from '../waiting-token-dialog/waiting-token-dialog';



@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatIconModule,MatTabsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  profile!: StudentProfileDto;

  constructor(private studentService: StudentService,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.studentService.getProfile().subscribe((res) => {
      this.profile = res.data;
    });
  }

  openWaitingTokenDialog(): void {
    const dialogRef = this.dialog.open(WaitingTokenDialog, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      data: {} // Pass any initial data here
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form submitted with data:', result);
        // Handle the form submission here
  
      }
    });
  }
}
