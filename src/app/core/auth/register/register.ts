import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { SnackBarService } from '../../../shared/services/snack-bar';
import { CommonButtonComponent } from '../../../shared/components/common-button/common-button';
import { ValidatorsPattern } from '../../../constants/validators-pattern';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    CommonButtonComponent,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  form: FormGroup;
  loading = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: SnackBarService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required,Validators.pattern(ValidatorsPattern.username)]],
      password: ['', [Validators.required,Validators.pattern(ValidatorsPattern.password)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;

    this.auth.register(this.form.value).subscribe({
      next: (res) => {
        if (res.error_message) {
          this.snackBar.Error(res.error_message);
          this.loading = false;
          return;
        }

        this.auth.login({
          username: this.form.value.username,
          password: this.form.value.password
        }).subscribe({
          next: (loginRes) => {
            this.auth.setToken(res.data.accessToken);
            this.auth.setRefreshToken(res.data.refreshToken);
            this.auth.setJustLoggedIn(true);
            this.router.navigate(['/student/dashboard']);
          },
          error: (err) => {
            this.snackBar.Error(err.error?.error_message || 'Auto login failed');
            this.router.navigate(['/auth/login']);
          }
        });
      },
      error: (err) => {
        this.loading = false;

        const errorMessage =
          err?.error?.error_message ||
          err?.error?.message ||
          'Registration failed.';

        this.snackBar.Error(errorMessage);
      }
    });
  }

}
