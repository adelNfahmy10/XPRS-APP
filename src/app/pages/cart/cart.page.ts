import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonList, IonItemSliding, IonLabel, IonItemOptions, IonItemOption, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { CartService } from 'src/core/services/cart/cart-service';
import { switchMap } from 'rxjs';
import { CheckoutService } from 'src/core/services/checkout/checkout-service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonItemOption, IonItemOptions, IonLabel, IonItemSliding, IonList, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink ]
})
export class CartPage implements OnInit {
  private readonly _CartService = inject(CartService)
  private readonly _CheckoutService = inject(CheckoutService)
  private readonly _ToastrService = inject(ToastrService)

  cartCount = this._CartService.cartCount;
  cartProducts = this._CartService.cartProducts;
  subTotal = this._CartService.subTotal;
  shippingValue = this._CheckoutService.shippingValue;
  cartId = this._CartService.cartId;
  quantities: { [key: number]: number } = {};

  ngOnInit(): void {
    this.getAllCart();
  }

  handleRefresh(event: any) {
    if(this.cartId()){
      this._CartService.getCart(this.cartId()).subscribe({
        next:(res)=>{
          this._CartService.cartCount.set(res.cartproduct.length);
          this._CartService.cartProducts.set(res.cartproduct);
          this._CartService.subTotal.set(res.total);

          event.target.complete();
        },
        error: () => {
          event.target.complete();
        }
      })
    }

  }

  getAllCart():void{
    if(this.cartId()){
      this._CartService.getCart(this.cartId()).subscribe({
        next:(res)=>{
          this._CartService.cartCount.set(res.cartproduct.length)
          this._CartService.cartProducts.set(res.cartproduct)
          this._CartService.subTotal.set(res.total)
        }
      })
    }
  }

  deleteProductInCart(productId:any):void{
    this._CartService.deleteCart(productId).subscribe({
      next:(res)=>{
        this._ToastrService.warning('Product removed from cart successfully');
        this.getAllCart()
      }
    })
  }

  getQuantity(item: any): number {
    return this.quantities[item.id] ?? 1;
  }

  increaseQuantity(item: any) {

    const current = this.getQuantity(item);

    this.quantities[item.id] = current + 1;

    this.updateProductCount(item);
  }

  decreaseQuantity(item: any) {

    const current = this.getQuantity(item);

    if (current > 1) {

      this.quantities[item.id] = current - 1;

      this.updateProductCount(item);
    }
  }

  updateProductCount(item: any): void {

    const qty = this.getQuantity(item);

    let data = {
      cart: this.cartId() == '0'
        ? +this.cartId()!
        : this.cartId(),
      product: item.id,
      product_property: item.product_property,
      quantity: qty
    };

    this._CartService.updateCartProduct(data).pipe(
      switchMap(() =>
        this._CartService.getCartCount(this.cartId()!)
      )
    ).subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        this._ToastrService.warning(
          'This product is already limited to 1 item per order.'
        );

        this.quantities[item.id] = 1;
      }
    });
  }
}
