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

  getAllHome() {
    return lastValueFrom(
      this.httpClient.get<IEvent[]>(`${this.baseUrl}/recently`)
    );
  }


  getEventById(idEvent: number) { //he cambiado el id por idEvent!!!!! OJO!!!!s
    return lastValueFrom(
      this.httpClient.get<IEvent>(`${this.baseUrl}/${idEvent}`)
    );
  }

  updateEvent(idEvent: number, event: Event) {
    return lastValueFrom(
      this.httpClient.put<IEvent>(`${this.baseUrl}/${idEvent}`, event)
    );
  }

  deleteEventById(idEvent: number) {
    return lastValueFrom(
      this.httpClient.delete<IEvent>(`${this.baseUrl}/${idEvent}`)
    );
  }
}
