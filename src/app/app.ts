import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'course-web';
  constructor(private router: Router) {
    console.log('Router Config:', this.router.config);
  }
}
