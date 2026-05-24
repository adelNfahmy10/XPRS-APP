import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/core/services/auth/auth-service';
import { CartService } from 'src/core/services/cart/cart-service';
import { CheckoutService } from 'src/core/services/checkout/checkout-service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from 'src/core/services/theme/theme-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonContent, CommonModule, FormsModule, ReactiveFormsModule, RouterLink ]
})
export class LoginPage {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)
  private readonly _CheckoutService = inject(CheckoutService)
  private readonly _ToastrService = inject(ToastrService)
  readonly _ThemeService = inject(ThemeService)
  private readonly _Router = inject(Router)

  token = this._CartService.token
  cartId = this._CartService.cartId

  handleRefresh(event: any) {

    this.loginForm.reset();

    event.target.complete();
  }

  loginForm:FormGroup = this._FormBuilder.group({
    username:[null, Validators.required],
    password:[null, Validators.required]
  })

  submitLogin():void{
    let data = this.loginForm.value

    this._AuthService.login(data).subscribe({
      next:(res)=>{
        localStorage.setItem('xprsToken', res.token)
        this.token.set(localStorage.getItem('xprsToken'))
        localStorage.setItem('userCartId', '0')
        this.cartId.set(localStorage.getItem('userCartId'))

        this.getUserCart(this.cartId)
        this.getUserInfo()

        this._ToastrService.success('Login Successfully!')
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        this._ToastrService.error(err?.error?.non_field_errors?.[0])
      }
    })
  }

  getUserCart(cartId:any):void{
    this._CartService.getCartCount(cartId).subscribe({
      next:(res)=>{
        this._CartService.cartCount.set(res.cartproduct.length);
        this._CartService.cartProducts.set(res.cartproduct);
        this._CartService.subTotal.set(res.total);
      }
    })
  }

  getUserInfo():void{
    if(this.token()){
      this._CheckoutService.getInfo().subscribe({
        next:(res)=>{
          localStorage.setItem('userId', res.id )
          localStorage.setItem('fullName', res.firstname + ' ' +res.lastname )
          localStorage.setItem('userEmail', res.email )
          localStorage.setItem('userPhone', res.phone )
        }
      })
    }
  }

  // Change Themes (Dark | Light) Mode
  changeTheme() {
    this._ThemeService.enableDarkMode(
      !this._ThemeService.isDark()
    );
  }

}
