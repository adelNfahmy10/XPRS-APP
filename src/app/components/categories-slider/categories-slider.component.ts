import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from 'src/core/services/home/home-service';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.scss'],
  imports:[RouterLink],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriesSliderComponent  implements OnInit {
  private readonly _HomeService = inject(HomeService)

  categories:any[] = []

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories():void{
    this._HomeService.getCategories().subscribe({
      next:(res)=>{
        this.categories = res
      }
    })
  }
}
