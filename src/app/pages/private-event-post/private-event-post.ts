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

  formulario: FormGroup = new FormGroup({
    id: new FormControl(null, [
      Validators.required,
    ]),
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
    users_id: new FormControl(null, [
      Validators.required,
    ])
  });

  async onSubmit() {
    try {
      const response = await this.eventService.createEvent(this.formulario.value);
      console.log(response)
      await Swal.fire({
        title: 'Éxito',
        text: 'Congratulations!!! se ha creado un nuevo evento',
        icon: 'success'
      });
      this.router.navigateByUrl('/events/private/admin');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Error en el envío, revisa el formulario.',
        icon: 'error'
      });
    }
  }

}
