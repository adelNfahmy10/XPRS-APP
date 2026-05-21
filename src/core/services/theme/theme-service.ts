import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  enableDarkMode(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    }
  }
}
