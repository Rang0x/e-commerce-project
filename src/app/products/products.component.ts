import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../product';
import { CartService } from '../services/cart.service';
import { MessageService } from 'primeng/api';
import { WishlistService } from '../services/wishlist.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  sortOrder: number = 0;
  sortField: string = '';
  currentPage: number = 1;
  rows: number = 18;
  showBtns:boolean = false;
  allProducts: Product[] = [];
  wishList: any[] = [];
  userWord: string = '';
  priceSortOptions!: { label: string; value: string; }[];
  constructor(private _productService: ProductsService, private _cartService: CartService, private _msgService: MessageService, private _wishListService: WishlistService){}
  ngOnInit(): void {
    this.priceSortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
  ];
    this._productService.getAllProducts().subscribe((res) => 
    {
      console.log(res);
      this.allProducts = res.data;
      console.log(this.allProducts);
    })
    this.getWish();
  }

  addPToCart(pId: string){
    this._cartService.addToCart(pId).subscribe((res) => {
      console.log(res);
      this._cartService.numOfCartItems.next(res.numOfCartItems);
      this.showSuccess()
    })
  }

  showSuccess() {
    this._msgService.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart' });
  }
  // Pagination Methods =====>
  getProductsofPage(page:number): Product[] {
    const startIndex = (page - 1) * this.rows;
    const endIndex = startIndex + this.rows;
    return this.allProducts.slice(startIndex, endIndex)
  }
  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    console.log(`on Page Change ${this.currentPage}`);
  }
  
  any(data:string){
    typeof data 
  }
  onSortChange(event: any) {
    const value = event.value;
    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }
  showBtn(){
    this.showBtns = true;
  }
  addToWhishList(pId:string){
    this._wishListService.addToWish(pId).subscribe({
        next: (res) => {
          console.log(res);
          this.getWish();
          this._msgService.add({ severity: 'success', summary: 'Success', detail: 'Product added to whishlist' });
          // this._wishListService.whishListCount.next(res.count);
        },
        error: (err) => console.log(err)
      })
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
        console.log(res.data);
        console.log(res.count);
        this._wishListService.whishListCount.next(res.count)
        console.log(this._wishListService.whishListCount.getValue());
        this.wishList = res.data.map((item:any) => item._id) 
        console.log(this.wishList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
