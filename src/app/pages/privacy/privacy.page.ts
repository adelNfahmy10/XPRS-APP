import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { DeliveryService } from 'src/core/services/delivery/delivery-service';
import { ThemeService } from 'src/core/services/theme/theme-service';
import { RefreshComponent } from "src/app/components/refresh/refresh.component";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RefreshComponent]
})
export class PrivacyPage implements OnInit {
  private readonly _DeliveryService = inject(DeliveryService)
  readonly _ThemeService = inject(ThemeService)

  deliveryContent:any[] = []

  ngOnInit() {
    this.getDeliveryContent()
  }

  handleRefresh(event: any) {
    this._DeliveryService.shippingPgae().subscribe({
      next:(res)=>{
        this.deliveryContent = res
        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    })
  }


  getDeliveryContent():void{
    this._DeliveryService.shippingPgae().subscribe({
      next:(res)=>{
        this.deliveryContent = res
      }
    })
  }

  // Change Themes (Dark | Light) Mode
  changeTheme() {
    this._ThemeService.enableDarkMode(
      !this._ThemeService.isDark()
    );
  }
}
