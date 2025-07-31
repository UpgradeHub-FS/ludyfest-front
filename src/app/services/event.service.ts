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

  getMyEvent() {
    return lastValueFrom(
      this.httpClient.get<IEvent[]>(`${this.baseUrl}/my-events`)
    )
  }


  getEventById(idEvent: number) { //he cambiado el id por idEvent!!!!! OJO!!!!s
    return lastValueFrom(
      this.httpClient.get<IEvent>(`${this.baseUrl}/${idEvent}`)
    );
  }

  registerToEvent(id: number, eventId: number, body: IRegisterToEvent) {
    return lastValueFrom(
      this.httpClient.post<IRegisterToEvent>(`${this.baseUrl}/register`, body)
    );
  }

  deleteRegisterToEvent(idEvent: number) {
    return lastValueFrom(
      this.httpClient.delete<IRegisterResponse>(`${this.baseUrl}/register${idEvent}`)
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
  getRegisteredEventsByUserId(userId: number) {
    return lastValueFrom(
      this.httpClient.get<IEvent[]>(`${this.baseUrl}/registered/user/${userId}`)
    );
  }


  filterByCapacity(min_capacity: number, max_capacity: number) {
    return lastValueFrom(
      this.httpClient.get<IEvent[]>(`${this.baseUrl}/capacity/${min_capacity}/${max_capacity}`
      )
    );

  }

  registerUserToEvent(body: IRegisterEventSubscribe) {
    return lastValueFrom(
      this.httpClient.post<IRegisterResponse>(`${this.baseUrl}/register/register-event`, body)
    );
  }

}
