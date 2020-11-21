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
import { AboutUsComponentComponent } from './about-us-component/about-us-component.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';
import { AdminNationaliteComponent } from './admin-nationalite/admin-nationalite.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EscortsProfileGuardService } from './escorts-profile-guard.service';
import { AppointmentsGuardService } from './appointments-guard.service';
import { IdentificationClientComponent } from './identification-client/identification-client.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { ConfirmationReservationComponent } from './confirmation-reservation/confirmation-reservation.component';
import { ConfirmationGuardService } from './confirmation-guard.service';
import { EndReservationComponent } from './end-reservation/end-reservation.component';
import { EndReservationGuardService } from './end-reservation-guard.service';
import { DemandesComponent } from './demandes/demandes.component';
import { TestDraggableComponent } from './test-draggable/test-draggable.component';



const routes: Routes = [
  {path:"products/:urlProds" , component:ProductsComponent},
  {path:"login" , component:AuthenticationComponent},
  {path:"adminCategories" , component:AdminCategoriesComponent},
  {path:"adminProducts" , component:AdminProductsComponent},
  {path:"adminUsers" , component:AdminUsersComponent},
  {path:"logout" , component:LogoutComponent},
  {path:"adminPays" , component:AdminPaysComponent},
  {path:"adminNationalite" , component:AdminNationaliteComponent},
  {path:"register" , component:RegisterComponent},
  {path:"validateMail" , component:ValidationInscriptionComponent},
  {path:"aboutUs" , component:AboutUsComponentComponent},
  {path:"myProfile/:userName" , component:MyProfileComponent,canActivate: [EscortsProfileGuardService]},
  {path:"profiles/:userName",component:ProfileComponent, canActivate: [EscortsProfileGuardService]},
  {path:"editMyProfile",component:EditMyProfileComponent},
  {path:"profiles",component:HomeComponent},
  {path:"appointments/:id",component:AppointmentsComponent, canActivate: [AppointmentsGuardService]},
  {path:'',redirectTo:'/profiles',pathMatch:'full'},
  {path:'notFound',component:PageNotFoundComponent},
  {path:'identification/:id',component:IdentificationClientComponent, canActivate: [AppointmentsGuardService]},
  {path:'loginClient/:id',component:LoginClientComponent, canActivate: [AppointmentsGuardService]},
  {path:'registerClient',component:RegisterClientComponent},
  {path:'registerClient/:id',component:RegisterClientComponent, canActivate: [AppointmentsGuardService]},
  {path:'client/:username',component:ProfileClientComponent},
  {path:'confirmation/:username/:id',component:ConfirmationReservationComponent, canActivate:[ConfirmationGuardService]},
  {path:'endReservation/:username/:id/:idDemandeReservation',component:EndReservationComponent,canActivate:[EndReservationGuardService]},
  {path:'myProfile/:userName/demandes',component:DemandesComponent,canActivate:[EscortsProfileGuardService]},
  {path:'testDraggable',component:TestDraggableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
