import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IEvent } from '../../interfaces/IEvents';
import { EventService } from '../../services/event.service';
import { formatDate } from '@angular/common';
;
@Component({
  selector: 'app-public-event-list-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './public-event-list-component.html',
  styleUrl: './public-event-list-component.css'
})
export class PublicEventListComponent {

  eventService = inject(EventService);
  arrEvents: IEvent[] = []

  sortOption = '';
  selectedCategories = '';
  selectedCategory = '';
  selectPrice = '';
  textEvent = '';
  dateInit = '';
  dateEnd = '';



  // Cuando se cambia de categoría...
  onChange(event: any) {
    this.selectedCategory = event.target.value;
  }


  // CONVERSOR DE CODIGO NUMERICO A TEXTO
  getStatusText(status: number): string {
    switch (status) {
      case 1: return 'Upcoming';   // Próximo
      case 0: return 'Not available';  // Cancelado
      default: return 'Unknown';   // Desconocido
    }
  }
  // CSS PARA EL ESTADO DEL EVENTO
  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'upcoming';   // próximos
      case 0: return 'cancelled';  // cancelados
      default: return 'unknown';   // desconocidos
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

  // __________________________ ⚡ RUTAS BACK _______________________________

  async ngOnInit() {
    const response = await this.eventService.getAll();
    this.arrEvents = response;
  }

  // FILTRAR EVENTOS POR AFORO
  async onChangeAforo(event: any) {
    this.selectedCategory = event.target.value;
    const aforos = event.target.value.split('/');

    const response = await this.eventService.filterByCapacity(aforos[0], aforos[1]);
    this.arrEvents = response;
  }

  // FILTRAR EVENTOS POR PRECIO
  priceValue: number = 0;
  async onChangePrice(event: any) {
    console.log(this.priceValue);
    this.selectPrice = event.target.value;

    const price = await this.eventService.filterByPrice(event.target.value);
    this.arrEvents = price
  }

  // FILTRAR POR CATEGORIAS
  async onChangeCategories(event: any) {
    this.selectedCategories = event.target.value;
    const arrCategories = await this.eventService.get_event_by_category(event.target.value);
    this.arrEvents = arrCategories
  }

  // FILTRAR POR FECHAS
  async filterByDate() {
    const response = await this.eventService.filterByDate(this.dateInit, this.dateEnd);
    this.arrEvents = response;
  }

  // FILTRAR POR TEXTO
  async getEventTitle() {
    const text = this.textEvent.trim();
    const response = await this.eventService.getEventTitle(text);
    this.arrEvents = response;
  }
}




