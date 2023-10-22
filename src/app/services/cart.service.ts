import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl:string = 'https://ecommerce.routemisr.com';
  numOfCartItems: BehaviorSubject<any> = new BehaviorSubject(0);
  cartEmpty: BehaviorSubject<any> = new BehaviorSubject(true);
  constructor(private _HttpClient: HttpClient) { }
  addToCart(pId: string): Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`, {"productId": `${pId}`});
  }
  getUserCart(): Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`);
  }
  removeItemInCart(itemId: string): Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${itemId}`);
  }
  clearUserCart(): Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`);
  }
  updateItemCount(itemId:string, count:number): Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${itemId}`, {"count": `${count}`})
  }
}
