import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { NotificationService } from 'src/core/services/notifications/notification-service';
import { TabsComponent } from "src/app/components/tabs/tabs.component";
import { CartBarComponent } from "src/app/components/cart-bar/cart-bar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonList, IonLabel, IonItem, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, DatePipe, TabsComponent, CartBarComponent, RouterLink ]
})
export class NotificationsPage implements OnInit {
  private readonly _NotificationService = inject(NotificationService)

  allNotifications:any[] = []

  ngOnInit() {
    this.getAllNotifications()
  }

  handleRefresh(event: any) {
    this._NotificationService.getNotificationsListing().subscribe({
      next:(res)=>{
        this.allNotifications = res;
        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    })
  }

  getAllNotifications():void{
    this._NotificationService.getNotificationsListing().subscribe({
      next:(res)=>{
        this.allNotifications = res
      }
    })
  }
}
