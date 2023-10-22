import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessageModule } from 'primeng/message';
import {StyleClassModule} from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './loader.interceptor';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SliderComponent } from './slider/slider.component';
import { CatSliderComponent } from './cat-slider/cat-slider.component';
import { ProductsComponent } from './products/products.component';
import { MaxLenPipe } from './max-len.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { SearchPipe } from './search.pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductPageComponent } from './product-page/product-page.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { HeaderInterceptor } from './header.interceptor';
import { CartComponent } from './cart/cart.component';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { BrandsComponent } from './brands/brands.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    LoaderComponent,
    SliderComponent,
    CatSliderComponent,
    ProductsComponent,
    MaxLenPipe,
    SearchPipe,
    ProductPageComponent,
    CartComponent,
    BrandsComponent,
    WishlistComponent,
    AllOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    RatingModule,
    MenubarModule,
    TieredMenuModule,
    BreadcrumbModule,
    MessageModule,
    StyleClassModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DividerModule,
    DialogModule,
    BadgeModule,
    CarouselModule,
    RatingModule,
    PaginatorModule,
    NgxImageZoomModule,
    TableModule,
    InputNumberModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    MessageModule,
    DataViewModule,
    TagModule,
    MenuModule
  ],
  providers: [ MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
