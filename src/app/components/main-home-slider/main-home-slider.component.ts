import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/core/services/cart/cart-service';
import { HomeService } from 'src/core/services/home/home-service';

@Component({
  selector: 'app-main-home-slider',
  templateUrl: './main-home-slider.component.html',
  styleUrls: ['./main-home-slider.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MainHomeSliderComponent  implements OnInit {
  private readonly _HomeService = inject(HomeService)

  homeSlider:any[] = []

  ngOnInit(): void {
    this.getHomeData()
  }

  getHomeData():void{
    this._HomeService.getHomeData().subscribe({
      next:(res)=>{
        this.homeSlider = res.slider
      }
    })
  }
}
