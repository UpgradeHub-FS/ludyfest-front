import { Component, Input, inject } from '@angular/core';
import { IEvent } from '../../interfaces/IEvents';
import { CardEvent } from '../card-event/card-event';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'card-list',
  imports: [CardEvent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css'
})
export class CardList {

  events: IEvent[] = [];

  eventsService = inject(EventService);


  async ngOnInit() {
    const response = await this.eventsService.getAllHome();
    this.events = response;

  }

}
