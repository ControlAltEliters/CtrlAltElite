import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

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
import { Time24to12Format } from './pipes/time24To12Format';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AccountPageComponent } from './views/account-page/account-page.component';
import { ProfileComponent } from './views/partials/profile/profile.component';
import { UserEventsComponent } from './views/partials/user-events/user-events.component';
import { FaqPageComponent } from './views/faq-page/faq-page.component';
import { CommonUtils } from './utils/common-utils';
import { NotifierModule } from "angular-notifier";
import { NotifierContainerComponent } from './views/partials/notifier-container/notifier-container.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DatePipe } from '@angular/common';
import { MessageBoardComponent } from './views/message-board/message-board.component';
import { UserFriendsComponent } from './views/partials/user-friends/user-friends.component';
import { NgpSortModule }from "ngp-sort-pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactFooterComponent,
    NavbarComponent,
    EventsPageComponent,
    Time24to12Format,
    AccountPageComponent,
    ProfileComponent,
    UserEventsComponent,
    FaqPageComponent,
    NotifierContainerComponent,
    AdminDashboardComponent,
    FilterPipe,
    MessageBoardComponent,
    UserFriendsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FullCalendarModule,
    HttpClientJsonpModule,
    NgpSortModule,
    NotifierModule.withConfig({
      behaviour: {
        autoHide: 3000,
        stacking: 3
    },
    })
  ],
  providers: [UserService, EventService, CommonUtils, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
