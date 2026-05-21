import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonList, IonItemSliding, IonLabel, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
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
  imports: [IonItemOption, IonItemOptions, IonLabel, IonItemSliding, IonList, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
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
  quantity: number = 1;

  constructor() {
    effect(()=>{
      // console.log(this.cartProducts());
      // console.log(this.cartCount());
      // console.log(this.shippingValue());
      // console.log(this.subTotal());
    })
  }

  ngOnInit(): void {
    this.getAllCart()
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

  increaseQuantity(item:any) {
    this.quantity += 1;
    this.updateProductCount(item)
  }
  decreaseQuantity(item:any) {
    if (this.quantity > 1) {
      this.quantity -= 1;
      this.updateProductCount(item)
    }
  }
  updateProductCount(item:any):void{
    let data = {
      cart: this.cartId() == '0' ? +this.cartId()! : this.cartId(),
      product: item.id,
      product_property: item.product_property,
      quantity: this.quantity
    }


    this._CartService.updateCartProduct(data).pipe(
      switchMap(() => this._CartService.getCartCount(this.cartId()!))
    ).subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        this.quantity = 1
      }
    });
  }
}
