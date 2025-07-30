
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PublicEventListComponent } from './pages/public-event-list-component/public-event-list-component';
import { PrivateEventList } from './pages/private-event-list/private-event-list';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { EventsComponent } from './pages/events/events.component';
import { PrivateUserComponent } from './pages/private-user/private-user.component';
import { PrivateUserList } from './pages/private-user-list/private-user-list';
import { PrivateEventEdit } from './pages/private-event-edit/private-event-edit';
import { PrivateEventPost } from './pages/private-event-post/private-event-post';


export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'events', component: PublicEventListComponent },
    { path: 'events/:idEvent', component: EventsComponent }, //OJO he cambiado 'id' a 'idEvent' !!!!!
    { path: 'events/private/admin', component: PrivateEventList },
    { path: 'events/private/admin/put/:idEvent', component: PrivateEventEdit },
    { path: 'events/private/admin/post', component: PrivateEventPost },
    { path: 'users/private/admin', component: PrivateUserList },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'profile', component: PrivateUserComponent },
    { path: '**', redirectTo: 'home' } //si no encuentra la pag que vaya al home
];








