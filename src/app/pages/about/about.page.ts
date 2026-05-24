import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { AboutService } from 'src/core/services/about/about-service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AboutPage implements OnInit {
  private readonly _AboutService = inject(AboutService)

  aboutContent:any[] = []

  ngOnInit() {
    this.getAboutUs()
  }

  handleRefresh(event: any) {
    this._AboutService.getAbout().subscribe({
      next: (res) => {

        this.aboutContent = res;

        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    });
  }

  getAboutUs():void{
    this._AboutService.getAbout().subscribe({
      next:(res)=>{
        this.aboutContent = res
      }
    })
  }


}
