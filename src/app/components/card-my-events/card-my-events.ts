import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-my-events',
  imports: [RouterLink],
  templateUrl: './card-my-events.html',
  styleUrl: './card-my-events.css'
})
export class CardMyEvents {
  @Input() event: IEvent | undefined;
}
