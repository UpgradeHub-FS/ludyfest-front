import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IEvent } from '../../interfaces/IEvents';
import { EventService } from '../../services/event.service';

// import { EventService } from './../../services/event.service';
// import { IEvent } from './../../interfaces/IEvents';
// import { Component, OnInit, inject, numberAttribute } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import Swal from 'sweetalert2';



@Component({
  selector: 'app-public-event-list-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './public-event-list-component.html',
  styleUrl: './public-event-list-component.css'
})
export class PublicEventListComponent {




  searchTerm = '';
  arrEvents: IEvent[] = []
  eventService = inject(EventService);
  sortOption = '';
  selectedCategory = '';
  categories: { [key: number]: string } = {
    1: 'Conciertos',
    2: 'Parties',
    3: 'Experiencias',
    4: 'Torneos',
    5: 'Cultura',
    6: 'Cine',
  };


  async ngOnInit() {
    const response = await this.eventService.getAll();
    this.arrEvents = response;
  }


  // Cuando se cambia de categoría...
  onChange(event: any) {
    this.selectedCategory = event.target.value;
  }

  get filteredEvents() {
    let filtered = this.arrEvents;

    // Filtro por categoría (si está seleccionada)
    if (this.selectedCategory) {
      filtered = filtered.filter(event => this.categories[event.categories_id] === this.selectedCategory);
    }

    // Búsqueda por título (escribir)
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(event => event.title.toLowerCase().includes(term));
    }

    // Ordenar segun abecedario o fecha
    if (this.sortOption === 'az') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortOption === 'za') {
      filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (this.sortOption === 'date') {
      filtered = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return filtered;
  }

  async onChangeAforo(event: any) {
    console.log(event.target.value);
    this.selectedCategory = event.target.value;



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
