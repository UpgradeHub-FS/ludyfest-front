import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
