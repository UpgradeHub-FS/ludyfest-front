import { EventService } from './../../services/event.service';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-private-event-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './private-event-edit.html',
  styleUrl: './private-event-edit.css'
})
export class PrivateEventEdit {
  @Input() idEvent: number = 0;

  eventService = inject(EventService);
  router = inject(Router)

  formulario: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    date: new FormControl(),
    price: new FormControl(),
    capacity: new FormControl(),
    adress: new FormControl(),
    latitude: new FormControl(),
    longitude: new FormControl(),
    image: new FormControl(),
    status: new FormControl(),
    categories_id: new FormControl(),
    users_id: new FormControl()
  });

  async ngOnInit() {
    try {
      const response = await this.eventService.getEventById(this.idEvent)
      this.formulario.patchValue(response);

    } catch (error) {
      Swal.fire('Error', 'El evento no existe', 'error')
      this.router.navigateByUrl('/events/private/admin')
    }
  }
  async onSubmit() {
    try {
      const response = await this.eventService.updateEvent(this.idEvent, this.formulario.value);
      Swal.fire('Éxito', 'Se han actualizado los datos del empleado', 'success');
      this.router.navigateByUrl('/events');
      Swal.fire({
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "",
        backdrop: ""
      });
    } catch (error) {
      Swal.fire('Error', 'Revisa los datos del formulario', 'error');
    }
  }
}
