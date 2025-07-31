import { Component, inject, Input } from '@angular/core';
import { IEvent } from '../../interfaces/IEvents';
import { EventService } from '../../services/event.service';
import { CardEvent } from '../card-event/card-event';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-events',
  imports: [CardEvent],
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
