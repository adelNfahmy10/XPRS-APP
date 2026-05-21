import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { OrderService } from 'src/core/services/order/order-service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {
private readonly _OrderService = inject(OrderService)

  allOrders:any[] = []
  shippingData:any

  ngOnInit(): void {
    this.getAllOrders()
    this.getAllShipping()
  }

  getAllOrders():void{
    this._OrderService.getOrders().subscribe({
      next:(res)=>{
        this.allOrders = res
      }
    })
  }

  getAllShipping():void{
    this._OrderService.shippingInstruction().subscribe({
      next:(res)=>{
        this.shippingData = res
      }
    })
  }

  cancelResone:string = ''
  cancelOrder(order:any):void{
    let data = {
      status : order.status,
      reason_for_cancelation: this.cancelResone
    };
    this._OrderService.cancelOrder(order.id, data)
  }
}
