import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from './../../services/event.service';
import { IEvent } from './../../interfaces/IEvents';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']  
})
export class EventsComponent {
  event: IEvent | undefined;
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      const response = await this.eventService.getEventById(id);
      this.event = response;
    }
  }

  // transforma el número de estado a un texxttoo
  getStatusText(status: number): string {
    switch(status) {
      case 1: return 'Upcoming';
      case 2: return 'Cancelled';
      default: return 'Unknown';
    }
  }

  // Devuelve la classe CSS al estado
  getStatusClass(status: number): string {
    switch(status) {
      case 1: return 'upcoming';
      case 2: return 'cancelled';
      default: return '';
    }
  }
}
