import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  favoriteItemCount = signal<number>(0);

  sync(count: any): void {
    this.favoriteItemCount.set(count);
  }
}
