import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl:string = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient: HttpClient) { }
  checkOut(cId: string , cForm: any): Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cId}?url=http://localhost:4200`, {"shippingAddress": cForm})
  }
}
