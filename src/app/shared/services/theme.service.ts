import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  toggleTheme(): void {
    const body = document.body;
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
  }

  setTheme(isDark: boolean): void {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');
  }

  isDark(): boolean {
    return document.body.classList.contains('dark-theme');
  }
}
