import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IEvent } from '../interfaces/IEvents';
import { IRegisterToEvent } from '../interfaces/IRegisterToEvent';
import { IRegisterEventSubscribe } from '../interfaces/IRegisterEventSubscribe';
import { IRegisterResponse } from '../interfaces/IRegisterResponse';

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

  registerToEvent(body: IRegisterToEvent) {
    return lastValueFrom(
      this.httpClient.post<IRegisterToEvent>(`${this.baseUrl}/register`, body)
    );
  }

  createEvent(newEvent: IEvent) {
    return lastValueFrom(
      this.httpClient.post<IEvent>(`${this.baseUrl}`, newEvent)
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

  registerUserToEvent(body: IRegisterEventSubscribe) {
    return lastValueFrom(
      this.httpClient.post<IRegisterResponse>('http://localhost:8000/events/register/register-event', body)
    );
  }
}
