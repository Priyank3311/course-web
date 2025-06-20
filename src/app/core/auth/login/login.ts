import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { ValidatorsPattern } from '../../../constants/validators-pattern';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonButtonComponent } from '../../../shared/modules/form-control/components/common-button/common-button';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthButtonControls, LoginFormControls } from '../../../shared/modules/form-control/static/button.config'
import { TextControllComponent } from '../../../shared/modules/form-control/components/text-controll.component/text-controll.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonButtonComponent,
    RouterModule,
    TextControllComponent
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  hide = true;
  loading = false;
  buttonControls = AuthButtonControls;
  formControls = LoginFormControls;
  loginForm: ReturnType<FormBuilder['group']>;



  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(ValidatorsPattern.username)]],
      password: ['', [Validators.required, Validators.pattern(ValidatorsPattern.password)]]
    });
  }

  togglePassword() {
    this.hide = !this.hide;
    this.formControls.passwordField.inputType = this.hide ? 'password' : 'text';
    this.formControls.passwordField.iconName = this.hide ? 'visibility' : 'visibility_off';
  }
  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.auth.login(this.loginForm.value).subscribe({
      next: async (res) => {
        this.auth.setToken(res.data.accessToken);
        this.auth.setRefreshToken(res.data.refreshToken);
        console.log('Login successful:', res.data);
        this.auth.setJustLoggedIn(true);
        const role = res.data.role.toLowerCase();
        setTimeout(() => {
          if (role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else if (role == 'student') {
            console.log('Navigating to student dashboard...');
            this.router.navigate(['/student/dashboard']);
          } else {
            alert('Unknown role');
          }
        }, 0);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        alert(err.error?.error_message || 'Login failed');
      }
    });
  }
}
