import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AboutService } from 'src/core/services/about/about-service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AboutPage implements OnInit {
  private readonly _AboutService = inject(AboutService)

  aboutContent:any[] = []

  ngOnInit() {
    this.getAboutUs()
  }

  getAboutUs():void{
    this._AboutService.getAbout().subscribe({
      next:(res)=>{
        this.aboutContent = res
      }
    })
  }


}
