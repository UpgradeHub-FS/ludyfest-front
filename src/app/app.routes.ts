
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PublicEventListComponent } from './pages/public-event-list/public-event-list.component';
import { EventsComponent } from './pages/events/events.component';



export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'events', component: PublicEventListComponent},
    { path:'events/:id', component: EventsComponent }
];
