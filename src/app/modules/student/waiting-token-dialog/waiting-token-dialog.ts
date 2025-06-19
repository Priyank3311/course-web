import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';


export interface WaitingTokenData {
  mobileNumber?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  numberOfPersons?: number;
  section?: string;

  title?: string;
  isEditMode?: boolean;
  tokenId?: string;
}

@Component({
  selector: 'app-waiting-token-dialog',
  imports: [MatDialogModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './waiting-token-dialog.html',
  styleUrl: './waiting-token-dialog.scss'
})
export class WaitingTokenDialog {
  waitingTokenForm: FormGroup;

  sections = [
    { value: 'section1', label: 'Section A' },
    { value: 'section2', label: 'Section B' },
    { value: 'section3', label: 'Section C' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WaitingTokenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: WaitingTokenData
  ) {
    this.waitingTokenForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberOfPersons: ['0', [Validators.required, Validators.min(1)]],
      section: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.waitingTokenForm.valid) {
      this.dialogRef.close(this.waitingTokenForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      this.waitingTokenForm.markAllAsTouched();
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.waitingTokenForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (field?.hasError('pattern')) {
      return 'Please enter a valid 10-digit mobile number';
    }
    if (field?.hasError('min')) {
      return 'Number of persons must be at least 1';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      mobileNumber: 'Mobile Number',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      numberOfPersons: 'Number of Persons',
      section: 'Section'
    };
    return labels[fieldName] || fieldName;
  }
}
