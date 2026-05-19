import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { DeliveryService } from 'src/core/services/delivery/delivery-service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrivacyPage implements OnInit {
  private readonly _DeliveryService = inject(DeliveryService)
  constructor() { }

  deliveryContent:any[] = []

  ngOnInit() {
    this.getDeliveryContent()
  }

  getDeliveryContent():void{
    this._DeliveryService.shippingPgae().subscribe({
      next:(res)=>{
        this.deliveryContent = res
      }
    })
  }
}
