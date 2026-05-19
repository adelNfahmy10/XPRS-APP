import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { StoresSerivce } from 'src/core/services/stores/stores-serivce';

@Component({
  selector: 'app-store-locator',
  templateUrl: './store-locator.page.html',
  styleUrls: ['./store-locator.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonButton, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class StoreLocatorPage implements OnInit {
  private readonly _StoresSerivce = inject(StoresSerivce)

  allStores:any[] = []

  ngOnInit() {
    this.getAllStores()
  }

  getAllStores():void{
    this._StoresSerivce.getStores().subscribe({
      next:(res)=>{
        this.allStores = res
      }
    })
  }
}
