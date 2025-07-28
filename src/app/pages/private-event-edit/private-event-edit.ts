import { EventService } from './../../services/event.service';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-private-event-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './private-event-edit.html',
  styleUrl: './private-event-edit.css'
})
export class PrivateEventEdit {
  @Input() idEvent: number = 0; //input llama al id de la ruta, copiar y pegar el nombre

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

  checkError(field: string, error: string) {

    return this.formulario.get(field)?.hasError(error) &&
      this.formulario.get(field)?.touched;
  }

  async ngOnInit() {
    try {
      const response = await this.eventService.getEventById(this.idEvent)
      this.formulario.patchValue(response);

    } catch (error) {

      /*       Swal.fire('Error', 'El evento no existe', 'error')
            this.router.navigateByUrl('/events/private/admin')  */
    }
  }
  async onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value); /* OJO */
    }
    try {
      const response = await this.eventService.updateEvent(this.idEvent, this.formulario.value);
      await Swal.fire({
        title: 'Exito',
        text: 'Evento actualizado correctamente',
        icon: 'success'
      });
      this.router.navigateByUrl('/events/private/admin');

    } catch (error) {
      Swal.fire('Error', 'Revisa los datos del formulario', 'error');
    }
  }
}
