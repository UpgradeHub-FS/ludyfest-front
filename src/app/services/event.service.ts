import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IEvent } from '../interfaces/IEvents';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8000/events';

  getAll() {
    return lastValueFrom(
      this.httpClient.get<IEvent[]>(`${this.baseUrl}`)
    );
  }
  /*getByCategory() {
 
  } */

  updateEvent(event_id: number, event: Event) {
    return lastValueFrom(
      this.httpClient.put<IEvent>(`${this.baseUrl}/${event_id}`, event)
    );
  }

  deleteEventById(event_id: number) {
    return lastValueFrom(
      this.httpClient.delete<IEvent>(`${this.baseUrl}/${event_id}`)
    );
  }


}
