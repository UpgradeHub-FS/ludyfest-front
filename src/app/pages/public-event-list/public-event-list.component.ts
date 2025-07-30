
// Importaciones necesarias de Angular
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IEvent } from '../../interfaces/IEvents';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-public-event-list', // Selector para usar en otras plantillas
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './public-event-list.component.html',
  styleUrls: ['./public-event-list.component.css']
})
export class PublicEventListComponent implements OnInit {
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
  // Término de búsqueda vinculado al input
  searchTerm = '';
  // Array que almacena todos los eventos obtenidos del backe
  events: IEvent[] = [];



  // Inyección del servicio de eventos
  constructor(private eventService: EventService) { }
  async ngOnInit(): Promise<void> {
    try {
      // Llamada al servicio para obtener loseventos
      const response = await this.eventService.getAll();
      // Logs para debugging (útiles durante desarrollo)
      /* console.log('Respuesta completa del backend:', response);
      if (response && response.length > 0) {
        console.log('Primer evento:', response[0]);
        console.log('Campo image del primer evento:', response[0].image);
        console.log('URL completa de imagen:', response[0].image);
      } */

      // asignamos eventos obtenidos al array local
      this.events = response;
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  }

  // Cuando se cambia de categoría...
  onChange(event: any) {
    this.selectedCategory = event.target.value;
  }
  get filteredEvents(): IEvent[] {
    let filtered = [...this.events];

    // Filtro por categoría
    if (this.selectedCategory) {
      filtered = filtered.filter(
        event => this.categories[event.categories_id] === this.selectedCategory
      );
    }

    // Filtro por término de búsqueda
    //busqueda en minusculas
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      // Filtrar eventos que coincidan en título, descripción o dirección
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.address.toLowerCase().includes(term)
      );
    }

    // Ordenar por...
    switch (this.sortOption) {
      case 'az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'date':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
    }

    return filtered;

  }


  onChangeCategory(value: string) {
    this.selectedCategory = value;
  }

  onSortChange(value: string) {
    this.sortOption = value;
  }



  // si hay errores de carga de imagen
  /*   onImageError(event: any): void {
      console.log('Error cargando imagen:', event.target.src);
      event.target.src = '/images/default-event.jpg';
    } */

  // Convertir código numérico de estado a texto legible(no encontraba solucion en esta parte)
  getStatusText(status: number): string {
    switch (status) {
      case 1: return 'Upcoming';   // Próximo
      case 0: return 'Not available';  // Cancelado
      default: return 'Unknown';   // Desconocido
    }
  }

  // Obtener clase CSS según el estado del evento
  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'upcoming';   // Clase CSS para próximos
      case 0: return 'cancelled';  // Clase CSS para cancelados
      default: return 'unknown';   // Clase CSS para desconocidos
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
