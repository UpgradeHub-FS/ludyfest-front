import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Event {
  name: string;
  date: string;
  capacity: number;
  status: 'Upcoming' | 'Cancelled';
  imageUrl: string;
}

@Component({
  selector: 'app-public-event-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public-event-list.component.html',
  styleUrls: ['./public-event-list.component.css']
})
export class PublicEventListComponent {
  searchTerm = '';

events: Event[] = [
  {
    name: 'Music Festival',
    date: 'May 15, 2024',
    capacity: 100,
    status: 'Upcoming',
    imageUrl: '/images/imagen-festival.jpg'
  },
  {
    name: 'Tech Talk',
    date: 'May 20, 2024',
    capacity: 200,
    status: 'Cancelled',
    imageUrl: '/images/imagen-festival.jpg'
  },
  {
    name: 'Networking Night',
    date: 'June 5, 2024',
    capacity: 50,
    status: 'Upcoming',
    imageUrl: '/images/imagen-festival.jpg'
  },
  {
    name: 'Summer Meetup',
    date: 'July 30, 2024',
    capacity: 300,
    status: 'Upcoming',
    imageUrl: '/images/imagen-festival.jpg'
  }
];


  get filteredEvents() {
    const term = this.searchTerm.toLowerCase();
    return this.events.filter(event =>
      event.name.toLowerCase().includes(term)
    );
  }
}
