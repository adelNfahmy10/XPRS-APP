import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { TvsPointsService } from 'src/core/services/tvs-points/tvs-points-service';
import { ThemeService } from 'src/core/services/theme/theme-service';

@Component({
  selector: 'app-tvc-points',
  templateUrl: './tvc-points.page.html',
  styleUrls: ['./tvc-points.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TvcPointsPage implements OnInit {
  private readonly _TvsPointsService = inject(TvsPointsService);
  readonly _ThemeService = inject(ThemeService);

  data: any = {};
  points: any;
  history: any[] = [];

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    this._TvsPointsService.getInfo().subscribe({
      next: (res) => {
        this.data = res;
        console.log(this.data);

        this.getPointsToken();
      },
      error: (err) => console.error(err)
    });
  }

  getPointsToken(): void {
    this._TvsPointsService.getPointsToken().subscribe({
      next: (res) => {
        // الـ Interceptor هيحفظ الـ access_token في LocalStorage
        this.getPointsHistory()
        this.getPoints();
      },
      error: (err) => console.error(err)
    });
  }

  getPoints(): void {
    this._TvsPointsService.getPoints(this.data?.phone).subscribe({
      next: (res) => {
        this.points = typeof res === 'string' ? JSON.parse(res) : res;
        console.log('points:', JSON.parse(res));
        this.getPointsHistory();
      },
      error: (err) => console.error(err)
    });
  }

  getPointsHistory(): void {
    this._TvsPointsService.getPointsHistory(this.data?.phone).subscribe({
      next: (res) => {
        this.history = res;
        console.log('History:', res);
      },
      error: (err) => console.error(err)
    });
  }
}
