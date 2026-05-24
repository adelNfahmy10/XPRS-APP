import { DecimalPipe, NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/core/services/cart/cart-service';
import { FavoriteService } from 'src/core/services/favorites/favorite-service';
import { HomeService } from 'src/core/services/home/home-service';

@Component({
  selector: 'app-top-selling-sliders',
  templateUrl: './top-selling-sliders.component.html',
  styleUrls: ['./top-selling-sliders.component.scss'],
  imports:[RouterLink, NgClass, DecimalPipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TopSellingSlidersComponent  implements OnInit {
private readonly _HomeService = inject(HomeService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)
  private readonly _FavoriteService = inject(FavoriteService)

  topSelling:any = {}
  fadeItems:Set<number> = new Set();

  cartId = this._CartService.cartId

  ngOnInit(): void {
    this.getHomeData()
    this.getAllCart()
  }

  getHomeData():void{
    this._HomeService.getHomeData().subscribe({
      next:(res)=>{
        this.topSelling = res.top_selling
      }
    })
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
