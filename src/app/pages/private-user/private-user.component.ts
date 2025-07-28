import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-private-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private-user.component.html',
  styleUrls: ['./private-user.component.css']
})
export class PrivateUserComponent implements OnInit {
  public user$: Observable<IUser | null> = of(null);

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user = JSON.parse(userString) as IUser;
      this.user$ = of(user);
    } else {
      console.warn('No hay usuario');
      this.user$ = of(null);
    }
  }
}
