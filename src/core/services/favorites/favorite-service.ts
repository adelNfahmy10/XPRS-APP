import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  favoriteItems = signal<any[]>([]);

  favoriteItemCount = computed(
    () => this.favoriteItems().length
  );

  constructor() {
    const saved = localStorage.getItem('myFavProduct');

    if (saved) {
      this.favoriteItems.set(JSON.parse(saved));
    }
  }

  isFavorite(item:any): boolean {
    return this.favoriteItems().some(
      fav => fav.id === item.id
    );
  }

  toggle(item:any): boolean {

    const current = this.favoriteItems();

    const exists = current.some(
      fav => fav.id === item.id
    );

    let updated:any[];

    if(exists){
      updated = current.filter(
        fav => fav.id !== item.id
      );
    } else {
      updated = [...current,item];
    }

    this.favoriteItems.set(updated);

    localStorage.setItem(
      'myFavProduct',
      JSON.stringify(updated)
    );

    return !exists;
  }
}
