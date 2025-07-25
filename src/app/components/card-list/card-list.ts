import { Component, Input } from '@angular/core';
import { IEvent } from '../../interfaces/IEvents';
import { CardEvent } from '../card-event/card-event';

@Component({
  selector: 'card-list',
  imports: [CardEvent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css'
})
export class CardList {
  @Input() events: IEvent[] = [];
}
