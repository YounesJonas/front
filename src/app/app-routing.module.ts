import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import {AuthenticationComponent} from './authentication/authentication.component'
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminPaysComponent } from './admin-pays/admin-pays.component';
import { RegisterComponent } from './register/register.component';
import {ValidationInscriptionComponent} from './validation-inscription/validation-inscription.component';

const routes: Routes = [
  {path:"products/:urlProds" , component:ProductsComponent},
  {path:"login" , component:AuthenticationComponent},
  {path:"adminCategories" , component:AdminCategoriesComponent},
  {path:"adminProducts" , component:AdminProductsComponent},
  {path:"adminUsers" , component:AdminUsersComponent},
  {path:"logout" , component:LogoutComponent},
  {path:"adminPays" , component:AdminPaysComponent},
  {path:"register" , component:RegisterComponent},
  {path:"validateMail" , component:ValidationInscriptionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
