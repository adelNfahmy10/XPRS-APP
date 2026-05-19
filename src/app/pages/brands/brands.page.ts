import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { BrandService } from 'src/core/services/brands/brand-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class BrandsPage implements OnInit {
  private readonly _BrandService = inject(BrandService)

  allBrands:any[] = []

  ngOnInit() {
    this.getAllBrands()
  }

  getAllBrands():void{
    this._BrandService.getBrands().subscribe({
      next:(res)=>{
        this.allBrands = res
      }
    })
  }

}
