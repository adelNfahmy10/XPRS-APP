import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { CartService } from 'src/core/services/cart/cart-service';
import { FavoriteService } from 'src/core/services/favorites/favorite-service';
import { NgxSpinnerComponent } from "ngx-spinner";

// Permisions
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { ThemeService } from 'src/core/services/theme/theme-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonToggle, RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonLabel, IonRouterLink, IonRouterOutlet, NgxSpinnerComponent],
})
export class AppComponent {
  private readonly _CartService = inject(CartService)
  private readonly _FavoriteService = inject(FavoriteService)
  private readonly _ThemeService = inject(ThemeService)

  token = this._CartService.token
  cartId = this._CartService.cartId
  favCount = this._FavoriteService.favoriteItemCount;
  cartProducts:any[] = []

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
    this.initPush();
    this._ThemeService.loadTheme();

    const id = this.cartId();

    if (!id && !this.token()) {
      this.addCart();
    } else {
      this.getCart();
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

  getCart(): void {
    const id = this.cartId();

    if (!id) return;

    this._CartService.getCart(id).subscribe({
      next: (res) => {
        this.cartProducts = res.cartproduct;

        // 👇 لو الكارت غير صالح أو فاضي حسب business
        if (!res.cartproduct || res.cartproduct.length === 0) {
          localStorage.removeItem('xprsCartId');
          this.cartId.set(null);

          this.addCart();
          return;
        }
      },
      error: () => {
        localStorage.removeItem('xprsCartId');
        this.cartId.set(null);

        this.addCart();
      }
    });
  }

  async initPush() {

    // 1. Request Permission
    const perm = await PushNotifications.requestPermissions();

    if (perm.receive !== 'granted') {
      console.log('Push permission denied');
      return;
    }

    // 2. Register device
    await PushNotifications.register();

    // 3. Get token
    PushNotifications.addListener('registration', (token) => {
      console.log('FCM Token:', token.value);
      // ابعته للـ backend
    });

    // 4. Success handler
    PushNotifications.addListener('registrationError', (err) => {
      console.log('Registration error:', err);
    });

    // 5. Notification received (app open)
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Notification received:', notification);
    });

    // 6. Notification tap
    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      console.log('Notification clicked:', action);
    });
  }

  isDark = false;

  changeTheme(event:any){
    this.isDark = event.detail.checked;

    this._ThemeService.enableDarkMode(this.isDark);
  }


}
