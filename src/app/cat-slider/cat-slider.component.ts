import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-cat-slider',
  templateUrl: './cat-slider.component.html',
  styleUrls: ['./cat-slider.component.scss']
})
export class CatSliderComponent implements OnInit{
  allCats:[] = [];
  constructor(private _catService: CategoriesService){}
  ngOnInit(): void {
    this._catService.getAllCat().subscribe((res)=>{
      console.log(res.data);
      this.allCats = res.data;
    })
  }
  customOptions: OwlOptions = {
    items: 8,
    loop: true,
    margin: 10,
    autoplay: true,
    slideTransition: 'linear',
    autoplayTimeout: 0,
    autoplaySpeed: 4000,
    autoplayHoverPause: true,
    navText: [''],
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 8,
      }
    },
    nav: true
  }
}
