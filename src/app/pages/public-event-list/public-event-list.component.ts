// Importaciones necesarias de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService, Event as AppEvent } from '../../services/event';

@Component({
  selector: 'app-public-event-list', // Selector para usar en otras plantillas
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public-event-list.component.html',
  styleUrls: ['./public-event-list.component.css']
})
export class PublicEventListComponent implements OnInit {
  // Término de búsqueda vinculado al input
  searchTerm = '';
  // Array que almacena todos los eventos obtenidos del backe
  events: AppEvent[] = [];
  // Inyección del servicio de eventos
  constructor(private eventService: EventService) { }
  async ngOnInit(): Promise<void> {
    try {
      // Llamada al servicio para obtener loseventos
      const response = await this.eventService.getAllEvents();
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

  // Getter que filtra eventos basado en la búsqueda
  get filteredEvents(): AppEvent[] {
    // devolver todos los eventos si no se encuentra la busqueda
    if (!this.searchTerm) {
      return this.events;
    }
    //busqueda en minusculas
    const term = this.searchTerm.toLowerCase();
    // Filtrar eventos que coincidan en título, descripción o dirección
    return this.events.filter(event =>
      event.title.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term) ||
      event.address.toLowerCase().includes(term)
    );
  }

  // si hay errores de carga de imagen
  onImageError(event: any): void {
    console.log('Error cargando imagen:', event.target.src);
    event.target.src = '/images/default-event.jpg';
  }

  // Convertir código numérico de estado a texto legible(no encontraba solucion en esta parte)
  getStatusText(status: number): string {
    switch (status) {
      case 1: return 'Upcoming';   // Próximo
      case 2: return 'Cancelled';  // Cancelado
      case 3: return 'Completed';  // Completado
      default: return 'Unknown';   // Desconocido
    }
  }

  // Obtener clase CSS según el estado del evento
  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'upcoming';   // Clase CSS para próximos
      case 2: return 'cancelled';  // Clase CSS para cancelados
      case 3: return 'completed';  // Clase CSS para completados
      default: return 'unknown';   // Clase CSS para desconocidos
    }
  }
}
