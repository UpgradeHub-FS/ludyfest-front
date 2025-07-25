import { Component, Input } from '@angular/core';
import { IEvent } from '../../interfaces/IEvents';

@Component({
  selector: 'card-event',
  imports: [],
  templateUrl: './card-event.html',
  styleUrl: './card-event.css'
})

export class CardEvent {
  // EVENT PROVISONAL
  @Input() event: IEvent | undefined;





}
