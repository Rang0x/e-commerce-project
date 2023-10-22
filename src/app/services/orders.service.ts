import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/orders/user/';
  constructor(private _http: HttpClient) { }
  getAllOrders(): Observable<any>{
    return this._http.get(`${this.baseUrl}65328e4e280f3ce5630bccc9`);
  }
}
