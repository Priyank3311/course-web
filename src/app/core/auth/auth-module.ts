import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material-module';
import { RouterModule } from '@angular/router';``

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    LoginComponent
  ]
})
export class AuthModule { }
