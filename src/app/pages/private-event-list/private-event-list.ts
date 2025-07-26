import { EventService } from './../../services/event.service';
import { IEvent } from './../../interfaces/IEvents';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-private-event-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './private-event-list.html',
  styleUrl: './private-event-list.css'
})
export class PrivateEventList {

  searchTerm = '';
  arrEvents: IEvent[] = []

  eventService = inject(EventService);

  async ngOnInit() {//al iniciar la pag que me guarde la info en el arrEvents
    const response = await this.eventService.getAll();
    console.log('Eventos recibidos:', response);
    this.arrEvents = response;

  }
  get filteredEvents() {
    const term = this.searchTerm.toLowerCase();
    return this.arrEvents.filter(event =>
      event.title.toLowerCase().includes(term)
    );
  }



}
