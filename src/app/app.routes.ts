
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PublicEventListComponent } from './pages/public-event-list/public-event-list.component';
<<<<<<< HEAD
import { Register } from './pages/register/register';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'events', component: PublicEventListComponent},
    {path: 'register', component: Register},
=======
import { Login } from './pages/login/login';
import { EventsComponent } from './pages/events/events.component';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'events', component: PublicEventListComponent },
    { path: 'login', component: Login },
    { path: 'events/:id', component: EventsComponent }
>>>>>>> origin/develop
];
