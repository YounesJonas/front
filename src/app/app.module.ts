import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { AboutUsComponentComponent } from './about-us-component/about-us-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';
import { AdminNationaliteComponent } from './admin-nationalite/admin-nationalite.component';
import { UniqueNationaliteValidatorDirective } from './shared/unique-nationalite-validator.directive';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NewEventComponent } from './new-event/new-event.component';
import { EndDateValidatorDirective } from './shared/end-date-validator.directive';
import { TwoHoursValidatorDirective } from './shared/two-hours-validator.directive';
import { CurrentDateValidatorDirective } from './shared/current-date-validator.directive';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IdentificationClientComponent } from './identification-client/identification-client.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { UniqueMailClientValidatorDirective } from './shared/unique-mail-client-validator.directive';
import { UniqueUsernameClientValidatorDirective } from './shared/unique-username-client-validator.directive';
import { ConfirmationReservationComponent } from './confirmation-reservation/confirmation-reservation.component';
import { EndReservationComponent } from './end-reservation/end-reservation.component';
import { DemandesComponent } from './demandes/demandes.component';
import { DecisionDialogComponent } from './decision-dialog/decision-dialog.component';
import { TestDraggableComponent } from './test-draggable/test-draggable.component';
import { PaymentComponent } from './payment/payment.component';

defineLocale('fr',frLocale);

const routes : Routes =[
  {path:"products/:urlProds",component:ProductsComponent}
]
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
])
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
    UniqueMailValidatorDirective,
    NavComponent,
    AboutUsComponentComponent,
    MyProfileComponent,
    EditMyProfileComponent,
    AdminNationaliteComponent,
    UniqueNationaliteValidatorDirective,
    HomeComponent,
    ProfileComponent,
    NewEventComponent,
    EndDateValidatorDirective,
    TwoHoursValidatorDirective,
    CurrentDateValidatorDirective,
    AppointmentsComponent,
    PageNotFoundComponent,
    IdentificationClientComponent,
    LoginClientComponent,
    RegisterClientComponent,
    ProfileClientComponent,
    UniqueMailClientValidatorDirective,
    UniqueUsernameClientValidatorDirective,
    ConfirmationReservationComponent,
    EndReservationComponent,
    DemandesComponent,
    DecisionDialogComponent,
    TestDraggableComponent,
    PaymentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    CommonModule, FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot()  ,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule, 
    MatIconModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    NgbModule,
    FullCalendarModule
    

  ],
  providers: [AppComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
