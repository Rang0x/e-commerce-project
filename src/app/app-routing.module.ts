import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { authGuard } from './auth.guard';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', canActivate: [authGuard], component: HomeComponent},
  {path: 'products', canActivate: [authGuard], component: ProductsComponent},
  {path: 'brands', canActivate: [authGuard], component: BrandsComponent},
  {path: 'allorders', canActivate: [authGuard], component: AllOrdersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'cart', component: CartComponent},
  {path: 'whishlist', component: WishlistComponent},
  {path: 'product/:id', component: ProductPageComponent},
  // {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// , {useHash: true}