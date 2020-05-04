import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminPaysComponent } from './admin-pays/admin-pays.component';
import { UniqueePaysValidatorDirective } from './shared/uniquee-pays-validator.directive';
import { FileValueAccessor } from './shared/file-value-accessor.directive';
import { FileValidaator } from './shared/file-validaator.directive';
import {NgxPaginationModule} from 'ngx-pagination'
import { UniqueCodePostalValidatorDirective } from './shared/unique-code-postal-validator.directive';
import { UniqueCityValidatorDirective } from './shared/unique-city-validator.directive';
import { RegisterComponent } from './register/register.component';
import { UniqueUsernameValidatorDirective } from './shared/unique-username-validator.directive';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { ValidationInscriptionComponent } from './validation-inscription/validation-inscription.component';
import { UniqueMailValidatorDirective } from './shared/unique-mail-validator.directive';

const routes : Routes =[
  {path:"products/:urlProds",component:ProductsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    AuthenticationComponent,
    AdminCategoriesComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    LogoutComponent,
    AdminPaysComponent,
    UniqueePaysValidatorDirective,
    FileValueAccessor,
    FileValidaator,
    UniqueCityValidatorDirective,
    UniqueCodePostalValidatorDirective,
    RegisterComponent,
    UniqueUsernameValidatorDirective,
    UniqueUsernameValidatorDirective,
    CompareValidatorDirective,
    ValidationInscriptionComponent,
    UniqueMailValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
