import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { CheckoutService } from '../services/checkout.service';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(private _cartService: CartService, private _checkoutService: CheckoutService, private _msgService: MessageService){}
  cartProducts:any = null;
  cartEmpty:boolean = true ;
  cartData:any = [];
  visible: boolean = false;
  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required])
  })
  showCheckout() {
      this.visible = true;
  }
  ngOnInit(): void {
    this._cartService.getUserCart().subscribe({
      next: (res) => {
        console.log(res.data.products)
        this.cartProducts = res.data.products;
        this.cartData = res;
        this.cartEmpty = false;
        console.log(this.cartData.data._id);
        console.log(this.cartProducts);
      },
      error: (err) => {
        console.log(err);
        if(err.statusMsg == "fail"){
          this._cartService.cartEmpty.subscribe(()=> {
            this.cartEmpty = this._cartService.cartEmpty.getValue();
          })
        }
      }
    })
  }
  updateCount(itemId:string, count:number){
    if(count == 0){
      this.clearItem(itemId);
      return;
    }
    this._cartService.updateItemCount(itemId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartProducts = res.data.products;
        this.cartData = res;
      },
      error: (err) => console.log(err)
    })
  }
  clearItem(itemId:string){
    this._cartService.removeItemInCart(itemId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartProducts = res.data.products;
        this.cartData = res;
      },
      error: (err) => console.log(err)
    })
  }
  clearCart(){
    this._cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartProducts = [];
        this.cartEmpty = true;
      },
      error: (err) => console.log(err)
    })
  }
  checkOut(cId:string, cForm: FormGroup){
    this._checkoutService.checkOut(cId, cForm.value).subscribe((res) => {
      console.log(res);
      window.location.href = res.session.url
    })
  }
  
}
