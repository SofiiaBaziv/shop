import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HotDealsComponent } from './pages/hot-deals/hot-deals.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BonusProgramComponent } from './pages/bonus-program/bonus-program.component';
import { AddressComponent } from './pages/address/address.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReturnComponent } from './pages/return/return.component';
import { SortMenuPipe } from './shared/pipes/sort-menu.pipe';
import { SearchCatPipe } from './shared/pipes/search-cat.pipe';
import { SearchProdPipe } from './shared/pipes/search-prod.pipe';
import { SearchOrdPipe } from './shared/pipes/search-ord.pipe';
import { SearchUserPipe } from './shared/pipes/search-user.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileLikeListComponent } from './pages/profile/profile-like-list/profile-like-list.component';
import { ProfileMainComponent } from './pages/profile/profile-main/profile-main.component';
import { AdminHealthProgramsComponent } from './admin/admin-health-programs/admin-health-programs.component';
import { HealthDetailsComponent } from './pages/health-details/health-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    HotDealsComponent,
    ContactComponent,
    AboutComponent,
    AdminComponent,
    AdminCategoriesComponent,
    AdminDiscountsComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    BonusProgramComponent,
    AddressComponent,
    DeliveryComponent,
    CartComponent,
    RegistrationComponent,
    ReturnComponent,
    SortMenuPipe,
    SearchCatPipe,
    SearchProdPipe,
    SearchOrdPipe,
    SearchUserPipe,
    ProfileComponent,
    ProfileLikeListComponent,
    ProfileMainComponent,
    AdminHealthProgramsComponent,
    HealthDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrderModule,
    FormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
