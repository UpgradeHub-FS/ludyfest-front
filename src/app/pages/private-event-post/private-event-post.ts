import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-private-event-post',
  imports: [ReactiveFormsModule],
  templateUrl: './private-event-post.html',
  styleUrl: './private-event-post.css'
})
export class PrivateEventPost {
  eventService = inject(EventService);
  router = inject(Router)

  imagenesDisponibles: string[] = [
    'img/ajedrez.jpg',
    'img/arte.jpg',
    'img/basket.jpg',
    'img/cine.jpg',
    'img/clasico.jpg',
    'img/cocina.jpg',
    'img/djparty.jpg',
    'img/docu.jpg',
    'img/fifa.jpg',
    'img/flamenco.jpg',
    'img/foodtrucks.jpg',
    'img/foto.jpg',
    'img/halloween.jpg',
    'img/indie.jpg',
    'img/infantil.jpg',
    'img/jazzfest.jpg',
    'img/kayak.jpg',
    'img/padel.jpg',
    'img/pintura.jpg',
    'img/playa.jpg',
    'img/reggateon.jpg',
    'img/rock.jpg',
    'img/senderismo.jpg',
    'img/teatro.jpg',
    'img/terror.jpg'
  ];




  formulario: FormGroup = new FormGroup({

    title: new FormControl(null, [
      Validators.required,

    ]),
    description: new FormControl(null, [
      Validators.required,

    ]),
    date: new FormControl(null, [
      Validators.required,

    ]),
    price: new FormControl(null, [
      Validators.required,

    ]),
    capacity: new FormControl(null, [
      Validators.required,

    ]),
    address: new FormControl(null, [
      Validators.required,

    ]),
    latitude: new FormControl(null, [
      Validators.required,

    ]),
    longitude: new FormControl(null, [
      Validators.required,

    ]),
    image: new FormControl(null, [
      Validators.required,

    ]),
    status: new FormControl(null, [
      Validators.required,

    ]),
    categories_id: new FormControl(null, [
      Validators.required,

    ]),

  });

  async onSubmit() {
    try {
      const raw = this.formulario.value;

      const payload = {
        ...raw,
        price: parseFloat(raw.price),
        capacity: parseInt(raw.capacity, 10),
        latitude: parseFloat(raw.latitude),
        longitude: parseFloat(raw.longitude),
        status: parseInt(raw.status, 10),
        categories_id: parseInt(raw.categories_id, 10),
        // 👇 Aquí transformamos la fecha al formato ISO completo
        date: new Date(raw.date).toISOString().split('.')[0], // Esto elimina ".000Z"
      };

      console.log('Payload a enviar:', payload);

      const response = await this.eventService.createEvent(payload);
      console.log(response);

      await Swal.fire({
        title: 'Éxito',
        text: '¡Se ha creado un nuevo evento!',
        icon: 'success'
      });

      this.router.navigateByUrl('/events/private/admin');

    } catch (error: any) {
      console.log('Error en el submit:', error);

      let message = 'Error en el envío, revisa el formulario.';
      if (error.error && error.error.detail) {
        message = JSON.stringify(error.error.detail);
      }

      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error'
      });
    }
  }

}
