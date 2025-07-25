import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  userService = inject(UserService);

  formulario: FormGroup = new FormGroup({
    email: new FormControl,
    password: new FormControl,
  });

  async onSubmit() {
    try {
      const response = await this.userService.login(this.formulario.value);
      console.log(response);
      Swal.fire('Éxito', response.message, 'success');
    } catch (error: any) {
      const detalle = error.error?.detail;

      const mensaje = Array.isArray(detalle)
        ? 'Faltan campos obligatorios'
        : detalle || 'Error en el login';

      Swal.fire('Error', mensaje, 'error');
    }
  }

}
