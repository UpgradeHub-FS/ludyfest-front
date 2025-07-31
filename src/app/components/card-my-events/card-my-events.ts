import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IEvent } from '../../interfaces/IEvents';

@Component({
  selector: 'app-card-my-events',
  imports: [RouterLink],
  templateUrl: './card-my-events.html',
  styleUrl: './card-my-events.css'
})
export class CardMyEvents {
  @Input() event: IEvent | undefined;
}
