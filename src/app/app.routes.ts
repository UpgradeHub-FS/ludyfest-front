import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PublicEventListComponent } from './pages/public-event-list/public-event-list.component';
import { PrivateEventList } from './pages/private-event-list/private-event-list';



export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'events', component: PublicEventListComponent },
    { path: 'events/admin', component: PrivateEventList },
    { path: '**', redirectTo: 'home' } //si no encuentra la pag que vaya al home
];



