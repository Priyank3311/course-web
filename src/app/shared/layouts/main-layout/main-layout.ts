import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';
import { ThemeService } from '../../services/theme.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSlideToggle
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent {
  role: string = '';


  constructor(private auth: AuthService,private router: Router,public themeService : ThemeService) {
    this.role = this.auth.getRole().toLowerCase();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login'])
  }
}
