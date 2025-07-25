import { Component } from '@angular/core';

import { IEvent } from '../../interfaces/IEvents';
import { CardList } from "../../components/card-list/card-list";
@Component({
  selector: 'app-home',
  imports: [CardList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  arrEvents: IEvent[] = [];
 





}
