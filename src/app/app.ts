import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {LoaderComponent} from '../app/shared/modules/form-control/components/loader/loader.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatSelectModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'course-web';
  constructor(private router: Router) {
    console.log('Router Config:', this.router.config);
  }
}
