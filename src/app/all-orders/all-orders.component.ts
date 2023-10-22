import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit{
  allOrders!: [];
  constructor(private _ordersService: OrdersService){}
  ngOnInit(): void {
    this.getUserOrders();
  }
  getUserOrders(){
    this._ordersService.getAllOrders().subscribe((res)=> {
      console.log(res);
      this.allOrders = res;
    })
  }

}
