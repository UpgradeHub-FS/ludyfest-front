import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from './../../services/event.service';
import { IEvent } from './../../interfaces/IEvents';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']  
})
export class EventsComponent {
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);

  // promesa en observable
  public event$: Observable<IEvent | undefined> = from(
    this.eventService.getEventById(Number(this.route.snapshot.paramMap.get('id')))
  );

  getStatusText(status: number): string {
    switch (status) {
      case 1: return 'Upcoming';
      case 2: return 'Cancelled';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'upcoming';
      case 2: return 'cancelled';
      default: return '';
    }
  }
}
