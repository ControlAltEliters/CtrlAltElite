import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule, MatCard } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import { HomeComponent } from './views/home/home.component';
import { ContactFooterComponent } from './views/partials/contact-footer/contact-footer.component';
import { NavbarComponent } from './views/partials/navbar/navbar.component';
import { EventsPageComponent } from './views/events-page/events-page.component';
import { LoginCardComponent } from './views/partials/login-card/login-card.component';
import { Time24to12Format } from './pipes/time24To12Format';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AccountPageComponent } from './views/account-page/account-page.component';
import { ProfileComponent } from './views/partials/profile/profile.component';
import { UserEventsComponent } from './views/partials/user-events/user-events.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactFooterComponent,
    NavbarComponent,
    EventsPageComponent,
    LoginCardComponent,
    Time24to12Format,
    AccountPageComponent,
    ProfileComponent,
    UserEventsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FullCalendarModule,
  ],
  providers: [
    UserService,
    EventService,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
