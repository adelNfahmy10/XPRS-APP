import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { CartService } from 'src/core/services/cart/cart-service';
import { FavoriteService } from 'src/core/services/favorites/favorite-service';
import { NgxSpinnerComponent } from "ngx-spinner";
import { Preferences } from '@capacitor/preferences';

// Permisions
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { ThemeService } from 'src/core/services/theme/theme-service';
import { Capacitor } from '@capacitor/core';
import { filter } from 'rxjs';
import * as icons from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonLabel, IonRouterLink, IonRouterOutlet, NgxSpinnerComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  private readonly _CartService = inject(CartService)
  private readonly _FavoriteService = inject(FavoriteService)
  readonly _ThemeService = inject(ThemeService)
  readonly _Router = inject(Router)

  token = this._CartService.token
  cartId = this._CartService.cartId
  favCount = this._FavoriteService.favoriteItemCount;
  cartProducts:any[] = []

  isClosing = signal(false);
  showWelcome = false;

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
    addIcons(icons);
    this.checkFirstVisit();
  }

  checkFirstVisit() {
    const isFirstVisit = localStorage.getItem('isFirstVisit');

    if (!isFirstVisit) {
      this.showWelcome = true;
    }
  }

  closeWelcome(type: 'login' | 'register' | 'home') {
    localStorage.setItem('isFirstVisit', 'false');
    this.showWelcome = false;

    this._Router.navigate([`/${type}`])
  }


  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      this.initPush();
    }

    this.changeTheme()
    this._ThemeService.loadTheme();

    const id = this.cartId();
    if (!id && !this.token()) {
      this.addCart();
    } else {
      this.getCart();
    }

  }

  // Add Cart When Open App
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

  // Get Cart When Open App
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

  // Push Notifications init
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

  // Change Themes (Dark | Light) Mode
  changeTheme() {
    this._ThemeService.enableDarkMode(
      !this._ThemeService.isDark()
    );
  }




}
