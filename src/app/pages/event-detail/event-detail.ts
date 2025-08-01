

import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IEvent } from '../../interfaces/IEvents';
import { EventService } from '../../services/event.service';







@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css'
})
export class EventDetailComponent implements OnInit {
  public event!: IEvent;
  @Input() idEvent: number = 0;
  private eventService = inject(EventService);

  async ngOnInit(): Promise<void> {
    if (this.idEvent > 0) {
      try {
        this.event = await this.eventService.getEventById(this.idEvent);
        console.log('Evento cargado:', this.event);
      } catch (error) {
        console.error('Error al obtener el evento:', error);
      }
    } else {
      console.warn('idEvent no válido:', this.idEvent);
    }
  }

  async onClick(idEvent: number) {
  
      const body = {
        event_id: idEvent
      };
      try {
        const response = await this.eventService.registerUserToEvent(body);
        await Swal.fire({
          title: 'Exito',
          text: 'Ya estás apuntado al evento. Te esperamos!',
          icon: 'success'
        });
        /* this.router.navigateByUrl('/events'); */
      } catch (error) {
        Swal.fire('Error', 'No se ha podido registrar al evento', 'error');
      }
    }
}
