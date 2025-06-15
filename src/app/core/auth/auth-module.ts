import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material-module';
import { RouterModule } from '@angular/router';``

@NgModule({
  declarations: [Login],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ]
})
export class AuthModule { }
