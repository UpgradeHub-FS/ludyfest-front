import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EventService } from './../../services/event.service';
import { IEvent } from './../../interfaces/IEvents';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  eventService = inject(EventService);
  router = inject(Router);

  formulario: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
    price: new FormControl(''),
    capacity: new FormControl(''),
    address: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    image: new FormControl(''),
    status: new FormControl(''),
    categories_id: new FormControl(''),
    users_id: new FormControl(''),
  });

  idEvent: number = 0;

  async ngOnInit() {
    try {
      const pathParts = window.location.pathname.split('/');
      //  la ruta es /events/:idEvent
      this.idEvent = Number(pathParts[pathParts.length - 1]);

      if (!isNaN(this.idEvent)) {
        const eventData: IEvent = await this.eventService.getEventById(this.idEvent);

        // Parchea el formulario con los datos del evento
        this.formulario.patchValue({
          title: eventData.title,
          description: eventData.description,
          date: eventData.date,
          price: eventData.price,
          capacity: eventData.capacity,
          address: eventData.address,
          latitude: eventData.latitude,
          longitude: eventData.longitude,
          image: eventData.image,
          status: eventData.status,
          categories_id: eventData.categories_id,
          users_id: eventData.users_id
        });
      }
    } catch (error) {
      console.error('Error cargando evento', error);
      Swal.fire('Error', 'No se pudo cargar el evento', 'error');
      this.router.navigateByUrl('/events');
    }
  }

  async onSubmit() {
    try {
      const updatedEvent = this.formulario.value;
      await this.eventService.updateEvent(this.idEvent, updatedEvent);
      Swal.fire('Éxito', 'Evento actualizado correctamente', 'success');
      this.router.navigateByUrl('/events');
    } catch (error) {
      Swal.fire('Error', 'Error al actualizar el evento, revisa los datos', 'error');
    }
  }
}
