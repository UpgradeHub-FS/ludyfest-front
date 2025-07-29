import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register-to-event',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './register-to-event.html',
  styleUrl: './register-to-event.css'
})

export class RegisterToEvent implements OnInit {
  @Input() idEvent: number = 0;
  eventService = inject(EventService);
  router = inject(Router);

  event: any; // Aquí guardaremos los datos del evento

  formulario: FormGroup = new FormGroup({
    date: new FormControl(null),
    aceptaTerminos: new FormControl(false),
    codigoPromocional: new FormControl(null)
  });
  async ngOnInit() {
    try {
      const response: any = await this.eventService.getEventById(this.idEvent);
      this.event = response;

      // fecha del evento
      this.formulario.get('date')?.setValue(this.event.date);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar el evento', 'error');
      this.router.navigateByUrl('/events');
    }
  }

  /*   async onSubmit() {
      if (this.formulario.valid) {
        try {
          const userId = 1; // ID del usuario
          const data = {
            users_id: userId,
            events_id: this.idEvent
          };
  
          await this.eventService.registerToEvent(data);
          Swal.fire('Registrado', 'Te has inscrito correctamente', 'success');
          this.router.navigateByUrl('/events');
        } catch (error: any) {
          Swal.fire('Error', error.error.detail, 'error');
        }
      }
    } */
}

/* export class RegisterToEvent {
  @Input() idEvent: number = 0; //input llama al id de la ruta, copiar y pegar el nombre
  eventService = inject(EventService);
  router = inject(Router)

  formulario: FormGroup = new FormGroup({});

  fechaPosteriorAHoy(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) return null;

    // Convertimos ambas fechas a "solo fecha", sin horas
    const fechaEntrada = new Date(control.value);
    const hoy = new Date();
    // Limpiar hora de ambas fechas
    const fechaSoloEntrada = new Date(fechaEntrada.getFullYear(), fechaEntrada.getMonth(), fechaEntrada.getDate());
    const fechaSoloHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    return fechaSoloEntrada > fechaSoloHoy ? null : { fechaNoValida: true };
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value); /* OJO */