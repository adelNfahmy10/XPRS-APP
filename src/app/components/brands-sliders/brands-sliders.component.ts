import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/core/services/cart/cart-service';
import { HomeService } from 'src/core/services/home/home-service';

@Component({
  selector: 'app-brands-sliders',
  templateUrl: './brands-sliders.component.html',
  styleUrls: ['./brands-sliders.component.scss'],
  imports: [RouterLink],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BrandsSlidersComponent  implements OnInit {
  private readonly _HomeService = inject(HomeService)

  brands:any[] = []

  ngOnInit(): void {
    this.getAllBrands()
  }

  getAllBrands():void{
    this._HomeService.getBrands().subscribe({
      next:(res)=>{
        this.brands = res
      }
    })
  }
}
