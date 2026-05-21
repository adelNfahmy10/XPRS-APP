import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { CartBarComponent } from "src/app/components/cart-bar/cart-bar.component";
import { Router, RouterLink } from '@angular/router';
import { CartService } from 'src/core/services/cart/cart-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, CartBarComponent, RouterLink]
})
export class ProfilePage {
  private readonly _CartService = inject(CartService)
  private readonly _Router = inject(Router)

  token = this._CartService.token
  userName:string | null = localStorage.getItem("fullName")

  logout():void {
    localStorage.removeItem('xprsToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userCartId')
    localStorage.removeItem('fullName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userPhone')
    localStorage.removeItem('userPhone')
    this._Router.navigateByUrl('/home').then(() => {
      window.location.reload();
    });
  }

}
