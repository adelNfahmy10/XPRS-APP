import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/core/services/cart/cart-service';
import { RouterLink } from '@angular/router';
import { FavoriteService } from 'src/core/services/favorites/favorite-service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink ]
})
export class FavoritesPage implements OnInit {
private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)
  private readonly _FavoriteService = inject(FavoriteService)

  fadeItems: Set<number> = new Set();
  favoritesItemes = this._FavoriteService.favoriteItems;

  cartId = this._CartService.cartId

  ngOnInit(): void {
    this.getAllCart()
  }

  handleRefresh(event: any) {
    if (this.cartId()) {
      this._CartService.getCart(this.cartId()).subscribe({
        next: (res) => {

          const products = res?.cartproduct || [];

          this._CartService.cartProducts.set(products);

          this._CartService.cartCount.set(
            products.length
          );

          event.target.complete();
        },
        error: () => {
          event.target.complete();
        }
      })
    }

    this.favoritesItemes = this._FavoriteService.favoriteItems;
  }

  // للتحقق إذا العنصر موجود في المفضلة
  isFavorite(item:any): boolean {
    return this._FavoriteService.isFavorite(item);
  }

  // إضافة / إزالة من المفضلة
  addToFavorite(item:any): void {

    const added =
    this._FavoriteService.toggle(item);

    if(added){

      this._ToastrService.success(
        'Product added to favorites successfully'
      );

      this.fadeItems.add(item.id);

      setTimeout(() => {
        this.fadeItems.delete(item.id);
      },1000);

    } else {

      this._ToastrService.warning(
        'Product removed from favorites successfully'
      );
    }
  }

  showFadeAnimation(item: any): boolean {
    return this.fadeItems.has(item.id);
  }

  isCart(item:any): boolean {
    return this._CartService.cartProducts().some(
      cartItem => cartItem.product?.id === item.id
    );
  }

  getCartItem(item:any) {
    return this._CartService.cartProducts().find(
      cartItem => cartItem.product?.id === item.id
    );
  }

  getAllCart(): void {
    if (this.cartId()) {
      this._CartService.getCart(this.cartId()).subscribe({
        next: (res) => {

          const products = res?.cartproduct || [];

          this._CartService.cartProducts.set(products);

          this._CartService.cartCount.set(
            products.length
          );
        }
      })
    }
  }

  addToCart(item:any):void{
    const cartItem = this.getCartItem(item);

    // 🟥 لو موجود → احذف
    if (cartItem) {
      this._CartService.deleteCart(cartItem.id).subscribe({
        next: (res) => {
          this.getAllCart();
          this._ToastrService.warning('Product removed from cart successfully');
        }
      });
      return;
    }

    const data = {
      product: item.id,
      cart: this.cartId() == '0' ? +this.cartId()! : this.cartId(),
      quantity: item.quantity || 1,
      product_property: null,
      card: null,
      branded_page_product: null,
      insurance: null
    };

    this._CartService.addCartProduct(data).subscribe({
      next: () => {
        this.getAllCart();
        this._ToastrService.success('Product added to cart successfully');
      }
    });
  }
}
