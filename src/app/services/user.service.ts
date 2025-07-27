import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { lastValueFrom } from 'rxjs';
import { IUserLogin } from '../interfaces/IUserLogin';


type LoginResponse = {
  success: boolean,
  message: string,
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpclient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8000/auth';

  registro(body: IUser) {
    return lastValueFrom(
      this.httpclient.post<LoginResponse>(`${this.baseUrl}/register`, body)
    )
  }

  login(body: IUserLogin) {
    return lastValueFrom(
      this.httpclient.post<LoginResponse>(`${this.baseUrl}/login`, body)
    );
  }

    getAll() {
      return lastValueFrom(
        this.httpclient.get<IUser[]>('http://localhost:8000/users')
      );
    }

    deleteUserById(user_id: number) {
        return lastValueFrom(
          this.httpclient.delete<IUser>(`http://localhost:8000/users/${user_id}`)
        );
      }
}
