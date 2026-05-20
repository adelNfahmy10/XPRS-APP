
import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { CartService } from 'src/core/services/cart/cart-service';
import { FavoriteService } from 'src/core/services/favorites/favorite-service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  private readonly _CartService = inject(CartService)
  private readonly _FavoriteService = inject(FavoriteService)

  token = this._CartService.token
  cartId = this._CartService.cartId
  favCount = this._FavoriteService.favoriteItemCount;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Shop', url: '/categories'},
    { title: 'Store Locator', url: '/store-locator'},
    { title: 'Brands', url: '/brands'},
    { title: `My Favorites`, url: '/favorites'},
    { title: 'About', url: '/about'},
    { title: 'Contact Us', url: '/contact-us'},
    { title: 'Privecy', url: '/privacy'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  ngOnInit(): void {
    if(!this.cartId() && !this.token()){
      this.addCart()
    }
  }

  addCart():void{
    this._CartService.addCart().subscribe({
      next:(res)=>{
        if(!this.token()){
          localStorage.setItem('xprsCartId', res.id)
          this.cartId.set(localStorage.getItem('xprsCartId'))
        }
      }
    })
  }




}
