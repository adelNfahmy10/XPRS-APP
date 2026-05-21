import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  isDark = signal(false);

  enableDarkMode(isDark: boolean) {
    this.isDark.set(isDark);

    document.body.classList.toggle('dark', isDark);

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme')  === 'dark';

    this.isDark.set(savedTheme);

    document.body.classList.toggle(
      'dark',
      savedTheme
    );
  }
}
