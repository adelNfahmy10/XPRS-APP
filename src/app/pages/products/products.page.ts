import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { CategorieService } from 'src/core/services/categories/categorie-service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonBackButton, IonButtons, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink ]
})
export class ProductsPage implements OnInit {
  private readonly _CategorieService = inject(CategorieService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  catId:any
  slug:any
  productsRelated:any[] = []

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
              this.productsRelated = res?.results;
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

            }
          });
        }
      }
    });
  }
}
