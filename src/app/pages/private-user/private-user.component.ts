import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { IEvent } from '../../interfaces/IEvents';
import { IUser } from '../../interfaces/IUser';
import { MyEvents } from '../../components/my-events/my-events';

@Component({
  selector: 'app-private-user',
  imports: [MyEvents],
  templateUrl: './private-user.component.html',
  styleUrls: ['./private-user.component.css']
})
export class PrivateUserComponent implements OnInit {
  public user!: IUser;
  public events: IEvent[] = [];
  public noEvents: boolean = false; // bandera para controlar mensaje sin *ngIf

  constructor(
    private eventService: EventService,
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.userService.getProfile();
      console.log('Usuario cargado:', this.user);

      const allEvents = await this.eventService.getAll();

      this.events = allEvents.filter(event => event.users_id === this.user.id);

      // Si no hay eventos, activamos bandera para mostrar mensaje
      this.noEvents = this.events.length === 0;

    } catch (error) {
      console.error('Error al cargar perfil y eventos:', error);
      this.noEvents = true; // si falla, asumimos que no hay eventos
    }
  }
}
