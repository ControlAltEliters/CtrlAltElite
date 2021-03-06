import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { EventsPageComponent } from './views/events-page/events-page.component';
import { FaqPageComponent } from './views/faq-page/faq-page.component';
import { AccountPageComponent } from './views/account-page/account-page.component';
import { ProfileComponent } from './views/partials/profile/profile.component';
import { UserEventsComponent } from './views/partials/user-events/user-events.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { MessageBoardComponent } from './views/message-board/message-board.component';
import { UserFriendsComponent } from './views/partials/user-friends/user-friends.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: localStorage.getItem("path") || 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    data: { title: 'Admin Dashboard' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login'}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register'}
  },
  {
    path: 'events',
    component: EventsPageComponent,
    data: { title: 'Events'}
  },
  {
    path: 'messages',
    component: MessageBoardComponent,
    data: { title: 'Messages'}
  },
  {
    path: 'faq',
    component: FaqPageComponent,
    data: { title: 'FAQ' }
  },
  {
    path: 'account',
    component: AccountPageComponent,
    data: { title: 'Account'},
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'user-events',
        component: UserEventsComponent
      },
      {
        path: 'user-friends',
        component: UserFriendsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
