import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string = 'https://ecommerce.routemisr.com';
  userSharedData: BehaviorSubject<any> = new BehaviorSubject(null);
  userName!: string;
  uId!: string;
  constructor(private _HttpClient: HttpClient, private _router: Router, private _cartService: CartService) {
    if(localStorage.getItem('userToken') == null){
      _router.navigate(['/login'])
    }
    else{
      this.shareData();
    }
  }
  // =======Sign-Up method======
  signUp(signupForm:any): Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, signupForm)
  }
  // =======Sign-In method=======
  signIn(loginForm:any): Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, loginForm)
  }
  // =======Decode User Token=====
  decodeUserToken(){
    let encodedToken:string = JSON.stringify( localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken);
    this.uId = decodedToken.id;
    console.log(this.uId);
    localStorage.setItem('userId', this.uId);
  }
  // =======Forget Pass methods===
  resetEmail(resetEmail:any): Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, resetEmail);
  }
  verifyCode(verifyCode:any): Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, verifyCode)
  }
  newPass(newPass:any): Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`, newPass)
  }
  shareData(){
    this.userSharedData.next(localStorage.getItem('userToken'));
    if(this.userSharedData.getValue() != null){
      this.userSharedData.next(jwtDecode(this.userSharedData.getValue()))
      console.log(this.userSharedData);
    }
    else{
      this.userSharedData.next(null)
    }
  }
  logout(){
    localStorage.removeItem('userToken');
    this.userSharedData.next(null);
    this._router.navigate(['/login'])
  }
}
