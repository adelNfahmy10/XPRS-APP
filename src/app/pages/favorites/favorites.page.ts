import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/core/services/cart/cart-service';
import { RouterLink } from '@angular/router';
import { FavoriteService } from 'src/core/services/favorites/favorite-service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class FavoritesPage implements OnInit {
private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)
  private readonly _FavoriteService = inject(FavoriteService)

  allFavorites: any[] = JSON.parse(localStorage.getItem('myFavProduct')!)
  cart:any[] = []
  cartId = this._CartService.cartId

  ngOnInit(): void {
    this.getAllCart()
    const storedFav = localStorage.getItem('myFavProduct');
    if (storedFav) {
      this.allFavorites = JSON.parse(storedFav);
    }
  }
  // حفظ العناصر اللي عليها animation
  fadeItems: Set<number> = new Set();
  // للتحقق إذا العنصر موجود في المفضلة
  isFavorite(item: any): boolean {
    return this.allFavorites.some(fav => fav.id === item.id);
  }
  // إضافة / إزالة من المفضلة
  addToFavorite(item: any): void {
    const index = this.allFavorites.findIndex(fav => fav.id === item.id);

    if (index === -1) {
      // لو مش موجود أضفه
      this.allFavorites.push(item);
      this._ToastrService.success('Product added to favorites successfully');
      // تشغيل animation
      this.fadeItems.add(item.id);
      setTimeout(() => this.fadeItems.delete(item.id), 1000); // مدة الfade CSS

    } else {
      // لو موجود، ممكن نعمل toggle ونحذفه (اختياري)
      this.allFavorites.splice(index, 1);
      this._ToastrService.warning('Product removed from favorites successfully');
    }

    // تحديث localStorage
    localStorage.setItem('myFavProduct', JSON.stringify(this.allFavorites));
    this._FavoriteService.sync(this.allFavorites.length);
  }
  showFadeAnimation(item: any): boolean {
    return this.fadeItems.has(item.id);
  }

  isCart(item: any): boolean {
    return this.cart.some(
      cartItem => cartItem.product?.id === item.id
    );
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

  getCartItem(item: any) {
    return this.cart.find(
      cartItem => cartItem.product?.id === item.id
    );
  }

  getAllCart():void{
    if(this.cartId()){
      this._CartService.getCart(this.cartId()).subscribe({
        next:(res)=>{
          this.cart = res?.cartproduct || [];
          this._CartService.cartCount.set(res.cartproduct.length)
          this._CartService.cartProducts.set(res.cartproduct)
        }
      })
    }
  }
}
