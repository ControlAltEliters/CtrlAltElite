import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { EventsPageComponent } from './views/events-page/events-page.component';
import { AccountPageComponent } from './views/account-page/account-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
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
    path: 'account',
    component: AccountPageComponent,
    data: { title: 'Account'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
