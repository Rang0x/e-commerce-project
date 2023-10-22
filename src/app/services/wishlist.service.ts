import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';
  whishListCount: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _Http: HttpClient) { }
  addToWish(pId: string): Observable<any>{
    return this._Http.post(`${this.baseUrl}/wishlist`, {
      "productId": pId
    })
  }
  removeWish(pId: string): Observable<any>{
    return this._Http.delete(`${this.baseUrl}/wishlist/${pId}`)
  }
  getWishList(): Observable<any>{
    return this._Http.get(`${this.baseUrl}/wishlist`)
  }
}
