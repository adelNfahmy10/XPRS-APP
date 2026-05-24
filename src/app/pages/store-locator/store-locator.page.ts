import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonButtons, IonBackButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { StoresSerivce } from 'src/core/services/stores/stores-serivce';
import { RefreshComponent } from "src/app/components/refresh/refresh.component";

@Component({
  selector: 'app-store-locator',
  templateUrl: './store-locator.page.html',
  styleUrls: ['./store-locator.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonBackButton, IonButtons, IonButton, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RefreshComponent]
})
export class StoreLocatorPage implements OnInit {
  private readonly _StoresSerivce = inject(StoresSerivce)

  allStores:any[] = []

  ngOnInit() {
    this.getAllStores()
  }

  handleRefresh(event: any) {
    this._StoresSerivce.getStores().subscribe({
      next:(res)=>{
        this.allStores = res;

        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    })
  }

  getAllStores():void{
    this._StoresSerivce.getStores().subscribe({
      next:(res)=>{
        this.allStores = res
      }
    })
  }

  openLocation(coordinates: string) {
    const [lat, lng] = coordinates.split(',');

    const url = `https://www.google.com/maps?q=${lat},${lng}`;

    window.open(url, '_blank');
  }
}
