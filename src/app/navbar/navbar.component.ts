import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StarIcon } from 'primeng/icons/star';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(private _auth : AuthService, private _cartService: CartService, private _whishListService: WishlistService, private _router: Router){}
  isLogged: boolean = false;
  userName!: string;
  cartItemsNum!: any;
  items!: any[];
  whishListCount!: any;
  ngOnInit(){
    this._cartService.numOfCartItems.subscribe(()=>
      this.cartItemsNum = this._cartService.numOfCartItems.getValue()
    )
    this._auth.userSharedData.subscribe(()=> {
      if(this._auth.userSharedData.getValue() == null){
        this.isLogged = false;
      }
      else{
        this.isLogged = true;
        this.userName = localStorage.getItem('userName')!.split(" ")[0];
        this.getUserCartItems();
      }
    })
    this._whishListService.whishListCount.subscribe(()=> {
      this.whishListCount = this._whishListService.whishListCount.getValue();
    })
    

    this.items = [
      {
        label: 'Orders',
        items: [
            {
                label: 'All Orders',
                icon: 'pi pi-box',
                command: () => {
                  this.allOrders();
                }
            }
          ]
      }
    ]
  }
  logOut(){
    this._auth.logout();
  }
  getUserCartItems(){
    this._cartService.getUserCart().subscribe((res)=> {
      console.log(res);
      this.cartItemsNum = res.numOfCartItems;
    })
  }
  allOrders(){
    this._router.navigate(['/allorders'])
  }
}
