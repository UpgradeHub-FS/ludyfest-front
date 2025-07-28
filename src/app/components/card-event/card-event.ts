import { Component, Input } from '@angular/core';
import { IEvent } from '../../interfaces/IEvents';
import { RouterLink} from '@angular/router';
@Component({
  selector: 'card-event',
  imports: [RouterLink],
  templateUrl: './card-event.html',
  styleUrl: './card-event.css'
})

export class CardEvent {

  @Input() event: IEvent | undefined;


}
