import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonRefresher, IonRefresherContent, IonSearchbar, IonRange } from '@ionic/angular/standalone';
import { CategorieService } from 'src/core/services/categories/categorie-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandService } from 'src/core/services/brands/brand-service';

export interface ProductFilters {
  brands: string[];
  categories: string[];

  minPrice?: number;
  maxPrice?: number;

  cpuBrands: string[];
  ramSizes: string[];

  storageSizes: string[];

  gpuModels: string[];

  screenSizes: string[];

  operatingSystems: string[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonRange, IonSearchbar, IonRefresherContent, IonRefresher, IonBackButton, IonButtons, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink ]
})
export class ProductsPage implements OnInit {
  private readonly _CategorieService = inject(CategorieService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  catId:any
  slug:any
  productsRelated:any[] = []

  filteredProducts: any[] = [];
  @ViewChild('searchBar') searchBar!: any;
  searchTerm = '';
  selectedSort = '';

  priceRange: any = {
    lower: 0,
    upper: 200000
  };
  defaultPriceRange = {
    lower: 0,
    upper: 200000
  };
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minRating: number | null = null;

  ngOnInit() {
    this.getRelatedProducts()
  }

  handleRefresh(event: any) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        const type = param.get('type');
        const value = param.get('value');
        if (!type || !value) return;

        // ===== Category =====
        if (type === 'category') {

          this._CategorieService.getProductsCategory(
            '',
            [value],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            'stock',
            20,
            1
          ).subscribe({
            next: (res) => {
              this.productsRelated = res?.results || [];
              this.filteredProducts = [...this.productsRelated];
            }
          });
        }

        // ===== Brand =====
        if (type === 'brand') {
          this._CategorieService.getProductsCategory(
            '',
            [],
            [],
            [],
            [value],
            [],
            [],
            [],
            [],
            'stock',
            20,
            1
          ).subscribe({
            next: (res) => {
              this.productsRelated = res?.results || [];
              this.filteredProducts = [...this.productsRelated];
            }
          });
        }

        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    });
  }

  // get related products
  getRelatedProducts(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        const type = param.get('type');
        const value = param.get('value');
        if (!type || !value) return;

        // ===== Category =====
        if (type === 'category') {

          this._CategorieService.getProductsCategory(
            '',
            [value],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            'stock',
            20,
            1
          ).subscribe({
            next: (res) => {
              this.productsRelated = res?.results;
              this.filteredProducts = [...this.productsRelated];
            }
          });
        }

        // ===== Brand =====
        if (type === 'brand') {
          this._CategorieService.getProductsCategory(
            '',
            [],
            [],
            [],
            [value],
            [],
            [],
            [],
            [],
            'stock',
            20,
            1
          ).subscribe({
            next: (res) => {
              this.productsRelated = res?.results;
              this.filteredProducts = [...this.productsRelated];
            }
          });
        }
      }
    });
  }

  // Filters & Sorting Methods
  toggleFiters:boolean = false

  toggleFilterSection(): void {
    this.toggleFiters = !this.toggleFiters
    if(!this.toggleFiters){
      this.resetFilters()
    }
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value || '';
    this.updateView();
  }

  onSortChange() {
    this.updateView();
  }

  sortProducts(): void {

    switch (this.selectedSort) {

      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;

      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;

      case 'nameAsc':
        this.filteredProducts.sort((a, b) =>
          (a.name || '').localeCompare(b.name || '')
        );
        break;
    }
  }

  onPriceChange() {
    this.updateView();
  }

  updateView(): void {

    this.filteredProducts = this.productsRelated.filter(product => {

      const name =
        (product?.name || product?.meta_title || '').toLowerCase();

      const searchMatch =
        !this.searchTerm ||
        name.includes(this.searchTerm.toLowerCase());

        const priceMatch =
          product.price >= this.priceRange.lower &&
          product.price <= this.priceRange.upper;

      const ratingMatch =
        this.minRating === null ||
        this.minRating === undefined ||
        (product.rating ?? 0) >= this.minRating;

      return searchMatch && priceMatch && ratingMatch;
    });

    this.sortProducts();
  }

  hasActiveFilters(): boolean {
    return (
      !!this.searchTerm ||
      !!this.selectedSort ||
      this.priceRange.lower !== this.defaultPriceRange.lower ||
      this.priceRange.upper !== this.defaultPriceRange.upper ||
      !!this.minRating
    );
  }

  resetFilters(): void {

    this.searchBar.value = ''; // 👈 ده المهم
    this.searchTerm = '';
    this.selectedSort = '';

    this.priceRange = {
      lower: 0,
      upper: 200000
    };

    this.minRating = null;

    this.updateView();
  }

}
