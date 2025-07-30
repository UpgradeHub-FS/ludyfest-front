import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  userService = inject(UserService);
  router = inject(Router);

  formulario: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  checkError(field: string, error: string) {
    return this.formulario.get(field)?.hasError(error) &&
      this.formulario.get(field)?.touched;
  }

  async onSubmit() {
    try {
      const response = await this.userService.login(this.formulario.value);

      // Guardar usuario en localStorage
      this.guardarUsuarioEnLocalStorage(response.user);

      // Guardar token en localStorage
      // Como el token en la LoginResponse es opcional primero hay que comprobar si existe
      if (response.token) {
        this.guardarTokenEnLocalStorage(response.token);
      }

      Swal.fire('Éxito', response.message, 'success');
      this.router.navigate(['/profile']);
    } catch (error: any) {
      Swal.fire('Error', error.error?.detail || 'Error en el login', 'error');
    }
  }

  //  Guardar usuario
  private guardarUsuarioEnLocalStorage(user: IUser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Guardar token
  private guardarTokenEnLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }
}
