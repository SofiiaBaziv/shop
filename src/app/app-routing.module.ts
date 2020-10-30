import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HotDealsComponent } from './pages/hot-deals/hot-deals.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { BonusProgramComponent } from './pages/bonus-program/bonus-program.component';
import { AddressComponent } from './pages/address/address.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { HealthDetailsComponent } from './pages/health-details/health-details.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminHealthProgramsComponent } from './admin/admin-health-programs/admin-health-programs.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserGuard } from './shared/guards/user.guard';
import { AdminGuard } from './shared/guards/admin.guard';

import { ReturnComponent } from './pages/return/return.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileLikeListComponent } from './pages/profile/profile-like-list/profile-like-list.component';
import { ProfileMainComponent } from './pages/profile/profile-main/profile-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'program-details/:id', component: HealthDetailsComponent },
  { path: 'hot-deals', component: HotDealsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'bonus-program', component: BonusProgramComponent },
  { path: 'address', component: AddressComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'cart', component: CartComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'return', component: ReturnComponent },

  {
    path: 'profile', component: ProfileComponent, canActivate: [UserGuard], children: [
      { path: '', redirectTo: 'profile-main', pathMatch: 'full' },
      { path: 'profile-main', component: ProfileMainComponent },
      { path: 'profile-likelist', component: ProfileLikeListComponent },
    ]
  },

  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      { path: '', redirectTo: 'admin-categories', pathMatch: 'full' },
      { path: 'admin-categories', component: AdminCategoriesComponent },
      { path: 'admin-discounts', component: AdminDiscountsComponent },
      { path: 'admin-orders', component: AdminOrdersComponent },
      { path: 'admin-products', component: AdminProductsComponent },
      { path: 'admin-users', component: AdminUsersComponent },
      { path: 'admin-healthPrograms', component: AdminHealthProgramsComponent },
    ]
  },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
