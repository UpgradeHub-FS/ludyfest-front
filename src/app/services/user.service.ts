import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { lastValueFrom } from 'rxjs';


type LoginResponse = {
  succes: string,
  user: IUser,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpclient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8000/auth';

  registro(body: IUser) {
    return lastValueFrom(
      this.httpclient.post<{ succes: string }>(`${this.baseUrl}/register`, body)
    )
  }

}
