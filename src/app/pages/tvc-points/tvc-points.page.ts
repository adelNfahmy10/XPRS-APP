import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonBackButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { TvsPointsService } from 'src/core/services/tvs-points/tvs-points-service';
import { ThemeService } from 'src/core/services/theme/theme-service';

@Component({
  selector: 'app-tvc-points',
  templateUrl: './tvc-points.page.html',
  styleUrls: ['./tvc-points.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonBackButton, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
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

  handleRefresh(event: any) {
    this._TvsPointsService.getInfo().subscribe({
      next: (res) => {
        this.data = res;
        console.log(this.data);

        this.getPointsToken();
        event.target.complete();
      },
      error: (err) =>{
        event.target.complete();
      }
    });
  }

  getInfo(): void {
    this._TvsPointsService.getInfo().subscribe({
      next: (res) => {
        this.data = res;
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
        this.getPointsHistory();
      },
      error: (err) => console.error(err)
    });
  }

  getPointsHistory(): void {
    this._TvsPointsService.getPointsHistory(this.data?.phone).subscribe({
      next: (res) => {
        this.history = res;
      },
      error: (err) => console.error(err)
    });
  }
}
