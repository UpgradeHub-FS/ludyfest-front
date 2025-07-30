import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  price: number;
  capacity: number;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  imageUrl?: string;
  status: number;
  categories_id: number;
  users_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  registerToEvent() {
    throw new Error('Method not implemented.');
  }
  private apiUrl: string = 'http://localhost:8000/events';
  //  ruta para las imágenes
  private imageBaseUrl: string = 'http://localhost:8000/images/'
  constructor(private httpClient: HttpClient) { }
  async getAllEvents(): Promise<Event[]> {
    //  promise y peticion alg get
    const events = await lastValueFrom(
      this.httpClient.get<Event[]>(this.apiUrl)
    );
    // (las imagenes del back no consigocargarlas) alternativa Construir URLs completas para las imágenes
    return events.map(event => ({
      ...event,
      // Construir URL completa si existe imagen, sino usar imagen por defecto
      imageUrl: event.image ? `${this.imageBaseUrl}${event.image}` : 'assets/images/default-event.jpg'
    }));
  }
}