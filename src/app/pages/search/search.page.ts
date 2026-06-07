import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonLabel, IonList, IonItem, IonButtons, IonMenuButton, IonIcon, IonSkeletonText, IonThumbnail, IonButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { CategorieService } from 'src/core/services/categories/categorie-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonButton, IonSkeletonText, IonButtons, IonItem, IonList, IonLabel, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonMenuButton, IonThumbnail ]
})
export class SearchPage implements OnInit{
  private readonly _CategorieService = inject(CategorieService);

  private searchSubject = new Subject<string>();
  searchItem: string = '';
  noResults: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
     this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {

      if (!value.trim()) {
        this.searchResults = [];
        this.noResults = '';
        return;
      }

      this.getSearchResult(value);
    });
  }

  handleRefresh(event: any) {
    this.searchItem = '';
    this.noResults = '';
    this.searchResults = [];
    this.isLoading = false;

    event.target.complete();
  }

  // Search On Input Change
  onSearchChange() {
    this.searchSubject.next(this.searchItem);
  }

  // Get Search Results
  getSearchResult(query: string): void {

    this.isLoading = true;
    this.searchResults = [];

    this._CategorieService.getProducts(
      query,
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      '-id',
      9,
      1,
      '0',
      '10000',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.searchResults = res.results || [];

        this.noResults = this.searchResults.length ? '' : 'No products found';
      },
      error: () => {
        this.isLoading = false;
        this.searchResults = [];
        this.noResults = 'Something went wrong';
      }
    });
  }

}
