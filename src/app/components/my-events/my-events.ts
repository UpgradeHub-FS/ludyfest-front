import { Component, inject, Input } from '@angular/core';
import { IEvent } from '../../interfaces/IEvents';
import { EventService } from '../../services/event.service';
import { CardMyEvents } from '../card-my-events/card-my-events';

@Component({
  selector: 'app-my-events',
  imports: [CardMyEvents],
  templateUrl: './my-events.html',
  styleUrl: './my-events.css'
})
export class MyEvents {
  events: IEvent[] = [];
  eventsService = inject(EventService);

  async ngOnInit() {
    const response = await this.eventsService.getMyEvent()
    this.events = response
  }


}
