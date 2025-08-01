import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { EventService } from '../../services/event.service';
import { IRegisterResponse } from '../../interfaces/IRegisterResponse';
import { IEvent } from '../../interfaces/IEvents';

@Component({
  selector: 'app-card-my-events',
  imports: [RouterLink],
  templateUrl: './card-my-events.html',
  styleUrl: './card-my-events.css'
})
export class CardMyEvents {
  @Input() event: IEvent | undefined;
  @Output() cargarEventos: EventEmitter<string> = new EventEmitter();
  eventService = inject(EventService);

  async onClick() {
    try {
      const result = await Swal.fire({
        title: "Abandonar el evento",
        text: "No podrás revertirlo!!",
        icon: "warning",
        showCancelButton: true,
        /*         confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!" */
      })

      if (result.isConfirmed) {
        await this.eventService.deleteRegisterToEvent(this.event?.id!);
        Swal.fire('Éxito', 'Se ha abandonado el evento', 'success');

        this.cargarEventos.emit()
      }
    } catch (error) {
      Swal.fire('Error', 'El evento no existe.', 'error');
    }
  }
}