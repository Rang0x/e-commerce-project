import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import { MessageService } from 'primeng/api';
ActivatedRoute
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit{
  pId:string = '';
  ratingValue: string = '3';
  productDetails!: Product;
  constructor(private _router:ActivatedRoute , private _productService: ProductsService, private _cartService: CartService, private _msgService: MessageService){}
  ngOnInit(): void {
    this.pId = this._router.snapshot.params['id'];
    this._productService.getSpecificProduct(this.pId).subscribe((res) => 
    {
      console.log(res);
      this.productDetails = res.data;
    })
  }
  addPToCart(pId: string){
    this._cartService.addToCart(pId).subscribe((res) => {
      console.log(res);
      this._cartService.numOfCartItems.next(res.numOfCartItems);
      this.showSuccess()
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    autoplay: true,
    autoplayHoverPause: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  showSuccess() {
    this._msgService.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart' });
  }
}
