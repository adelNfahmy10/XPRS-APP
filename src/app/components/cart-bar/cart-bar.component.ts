import { Component, effect, inject, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart/cart-service';

@Component({
  selector: 'app-cart-bar',
  templateUrl: './cart-bar.component.html',
  styleUrls: ['./cart-bar.component.scss'],
})
export class CartBarComponent {
  private readonly _CartService = inject(CartService)

  cartCount = this._CartService.cartCount;
  cartProducts = this._CartService.cartProducts;
  cart:any[] = []
  cartId = this._CartService.cartId

  constructor(){
    effect(() => {
      if(this.cartId()){
        this.getAllCart()
      }
    });
  }

  getAllCart():void{
    this._CartService.getCart(this.cartId()).subscribe({
      next:(res)=>{
        this.cart = res?.cartproduct || [];
        this._CartService.cartCount.set(res.cartproduct.length)
        this._CartService.cartProducts.set(res.cartproduct)
      }
    })
  }

}
