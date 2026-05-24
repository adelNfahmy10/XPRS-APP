import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { MainHomeSliderComponent } from "src/app/components/main-home-slider/main-home-slider.component";
import { CategoriesSliderComponent } from "src/app/components/categories-slider/categories-slider.component";
import { BrandsSlidersComponent } from "src/app/components/brands-sliders/brands-sliders.component";
import { SpeicalsOffersSlidersComponent } from "src/app/components/speicals-offers-sliders/speicals-offers-sliders.component";
import { EssentialsSlidersComponent } from "src/app/components/essentials-sliders/essentials-sliders.component";
import { TopSellingSlidersComponent } from "src/app/components/top-selling-sliders/top-selling-sliders.component";
import { RouterLink } from '@angular/router';
import { TabsComponent } from "src/app/components/tabs/tabs.component";
import { CartBarComponent } from "src/app/components/cart-bar/cart-bar.component";
import { ThemeService } from 'src/core/services/theme/theme-service';
import { HomeService } from 'src/core/services/home/home-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, MainHomeSliderComponent, CategoriesSliderComponent, BrandsSlidersComponent, SpeicalsOffersSlidersComponent, EssentialsSlidersComponent, TopSellingSlidersComponent, RouterLink, TabsComponent, CartBarComponent ],
})
export class HomePage {
  readonly _ThemeService = inject(ThemeService);
  private readonly _HomeService = inject(HomeService);

  handleRefresh(event: any) {
    this._HomeService.getHomeData().subscribe({
      next: (res) => {
        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    });

  }

  // Change Themes (Dark | Light) Mode
  changeTheme() {
    this._ThemeService.enableDarkMode(
      !this._ThemeService.isDark()
    );
  }
}
