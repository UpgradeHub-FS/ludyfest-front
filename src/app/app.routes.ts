
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PublicEventListComponent } from './pages/public-event-list/public-event-list.component';
import { PrivateEventList } from './pages/private-event-list/private-event-list';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { EventsComponent } from './pages/events/events.component';



export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'events', component: PublicEventListComponent },
    { path: 'events/private/admin', component: PrivateEventList },
    { path: 'events/:id', component: EventsComponent },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '**', redirectTo: 'home' } //si no encuentra la pag que vaya al home
];







