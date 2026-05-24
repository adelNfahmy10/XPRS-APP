import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { HomeService } from 'src/core/services/home/home-service';
import { RouterLink } from '@angular/router';
import { TabsComponent } from "src/app/components/tabs/tabs.component";
import { CartBarComponent } from "src/app/components/cart-bar/cart-bar.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, RouterLink, TabsComponent, CartBarComponent ]
})
export class CategoriesPage implements OnInit {
  private readonly _HomeService = inject(HomeService)

  categories:any[] = []

  ngOnInit() {
    this.getAllCategories()
  }

  handleRefresh(event: any) {

    this._HomeService.getCategories().subscribe({
      next:(res)=>{
        this.categories = res;

        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    })

  }

  getAllCategories():void{
    this._HomeService.getCategories().subscribe({
      next:(res)=>{
        this.categories = res
      }
    })
  }
}
