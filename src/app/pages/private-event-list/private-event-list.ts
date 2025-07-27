import { EventService } from './../../services/event.service';
import { IEvent } from './../../interfaces/IEvents';
import { Component,OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-private-event-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './private-event-list.html',
  styleUrl: './private-event-list.css'
})
export class PrivateEventList {

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


  async ngOnInit() {//al iniciar la pag que me guarde la info en el arrEvents
    const response = await this.eventService.getAll();
    console.log('Eventos recibidos:', response);
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



  async onClick(event_id: number) {
    try {
      const result = await Swal.fire({
        title: "Borrar",
        text: "No podrás revertirlo!!",
        icon: "warning",
        showCancelButton: true,
        /*         confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!" */
      })

      if (result.isConfirmed) {
        await this.eventService.deleteEventById(event_id);
        Swal.fire('Éxito', 'Se ha borrado el evento', 'success');

        const response = await this.eventService.getAll();
        this.arrEvents = response;
      }
    } catch (error) {
      Swal.fire('Error', 'El evento no existe. Revisa', 'error');
    }



    /* Para el formulario o lo que sea para actualizar->    async onSubmit() {
          try {
            const response = await this.eventService.updateEvent(this.event_id, this.formulario.value);
            Swal.fire('Éxito', 'Se han actualizado los datos del empleado', 'success');
            this.router.navigateByUrl('/events');
            Swal.fire({
              width: 600,
              padding: "3em",
              color: "#716add",
              background: "",
              backdrop:""
            });
          } catch (error) {
            Swal.fire('Error', 'Revisa los datos del formulario', 'error');
          }
        } */



  }
}

