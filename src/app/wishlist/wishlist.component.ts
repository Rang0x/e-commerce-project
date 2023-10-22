import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { MessageService } from 'primeng/api';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  wishList: any[] = [];
  whishEmpty: boolean = true;
  constructor(private _wishListService: WishlistService, private _msgService: MessageService, private _cartService: CartService){}
  ngOnInit(): void {
    this.getWish();
  }
  removeWhishList(pId: string){
    this._wishListService.removeWish(pId).subscribe({
      next: (res) => {
        console.log(res);
        this.getWish();
        this._msgService.add({ severity: 'warn', summary: 'Success', detail: 'Product removed from wishlist' });
      },
      error: (err) => console.log(err)
    })
  }
  getWish(){
    this._wishListService.getWishList().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        this.wishList = res.data
        if(res.count > 0){
          this.whishEmpty = false;
        }
        else {
          this.whishEmpty = true;
        }
        this._wishListService.whishListCount.next(res.count);
        console.log(this.wishList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  // Add product from whishlist to cart!
  addToCart(pId: string){
    this._cartService.addToCart(pId).subscribe((res) => {
      console.log(res);
      this._cartService.numOfCartItems.next(res.numOfCartItems);
      this._msgService.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart' });
    })
  }
}
