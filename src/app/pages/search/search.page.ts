import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonLabel, IonList, IonItem, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { CartService } from 'src/core/services/cart/cart-service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { CategorieService } from 'src/core/services/categories/categorie-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonButtons, IonItem, IonList, IonLabel, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonMenuButton]
})
export class SearchPage implements OnInit {

  private readonly _CategorieService = inject(CategorieService);

  searchItem: string = '';
  noResults: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {

  }

  // Search On Input Change
  onSearchChange(): void {

    const value = this.searchItem.trim();

    // Empty Input
    if (!value) {
      this.searchResults = [];
      this.noResults = '';
      return;
    }

    this.getSearchResult();

  }

  // Get Search Results
  getSearchResult(): void {

    this.isLoading = true;

    this._CategorieService.getProducts(
      this.searchItem, // search

      [], // categories
      [], // shop_categories
      [], // subcategories
      [], // brands
      [], // graphicscard
      [], // processors
      [], // ram
      [], // storage

      '-id', // sort
      9, // page_size
      1, // page

      '0', // price_low
      '10000', // price_heigh

      '', // top_offer
      '', // trending
      '', // top_selling
      '', // quickly_30
      '', // magazine
      '', // black_friday
      '', // just_arrived
      '', // specialoffer1
      '', // specialoffer2
      '' // specialoffer3
    ).subscribe({

      next: (res) => {

        this.isLoading = false;

        this.searchResults = res.results || [];

        // No Results
        if (this.searchResults.length === 0) {
          this.noResults = 'No products found';
        } else {
          this.noResults = '';
        }
      },

      error: () => {

        this.isLoading = false;
        this.searchResults = [];
        this.noResults = 'Something went wrong';

      }

    });

  }

}
