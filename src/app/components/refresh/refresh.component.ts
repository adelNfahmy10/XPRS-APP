import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonRefresher, IonRefresherContent } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class RefreshComponent {

  @Output() refresh = new EventEmitter<any>();

  onRefresh(event: any) {
    this.refresh.emit(event);
  }
}
