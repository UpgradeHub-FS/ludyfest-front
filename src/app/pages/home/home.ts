import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IEvent } from '../../interfaces/IEvents';
import { CardList } from "../../components/card-list/card-list";
@Component({
  selector: 'app-home',
  imports: [CardList, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  arrEvents: IEvent[] = [];
 





}
