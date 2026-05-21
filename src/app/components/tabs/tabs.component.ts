import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from 'src/core/services/theme/theme-service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [RouterLink, NgStyle]
})
export class TabsComponent {
  readonly _ThemeService = inject(ThemeService)

  // Change Themes (Dark | Light) Mode
  changeTheme() {
    this._ThemeService.enableDarkMode(
      !this._ThemeService.isDark()
    );
  }

}
