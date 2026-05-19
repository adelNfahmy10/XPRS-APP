import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { MainHomeSliderComponent } from "src/app/components/main-home-slider/main-home-slider.component";
import { CategoriesSliderComponent } from "src/app/components/categories-slider/categories-slider.component";
import { BrandsSlidersComponent } from "src/app/components/brands-sliders/brands-sliders.component";
import { SpeicalsOffersSlidersComponent } from "src/app/components/speicals-offers-sliders/speicals-offers-sliders.component";
import { EssentialsSlidersComponent } from "src/app/components/essentials-sliders/essentials-sliders.component";
import { TopSellingSlidersComponent } from "src/app/components/top-selling-sliders/top-selling-sliders.component";
import { SpecialSellingSlidersComponent } from "src/app/components/special-selling-sliders/special-selling-sliders.component";
import { RouterLink } from '@angular/router';
import { TabsComponent } from "src/app/components/tabs/tabs.component";
import { CartService } from 'src/core/services/cart/cart-service';
import { CartBarComponent } from "src/app/components/cart-bar/cart-bar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, MainHomeSliderComponent, CategoriesSliderComponent, BrandsSlidersComponent, SpeicalsOffersSlidersComponent, EssentialsSlidersComponent, TopSellingSlidersComponent, SpecialSellingSlidersComponent, RouterLink, TabsComponent, CartBarComponent],
})
export class HomePage {

}
