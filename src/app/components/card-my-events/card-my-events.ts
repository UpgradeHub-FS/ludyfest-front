import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IEvent } from '../../interfaces/IEvents';
import Swal from 'sweetalert2';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-card-my-events',
  imports: [RouterLink],
  templateUrl: './card-my-events.html',
  styleUrl: './card-my-events.css'
})
export class CardMyEvents {
  @Input() event: IEvent | undefined;

  eventService = inject(EventService);
  /*   async onClick(idEvent: number) {
      try {
        const result = await Swal.fire({
          title: "Borrar",
          text: "No podrás revertirlo!!",
          icon: "warning",
          showCancelButton: true,
                   confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!" 
        })
  
        if (result.isConfirmed) {
          await this.eventService.deleteEventById(idEvent);
          Swal.fire('Éxito', 'Se ha borrado el evento', 'success');
  
          const response = await this.eventService.getAll();
          this.arrEvents = response;
        }
      } catch (error) {
        Swal.fire('Error', 'El evento no existe. Revisa', 'error');
      }
    } */
}