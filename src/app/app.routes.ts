
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { EventsComponent } from './pages/events/events.component';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'events/:id', component: EventsComponent }
];
