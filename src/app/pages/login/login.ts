import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      console.log(response);
      Swal.fire('Éxito', response.message, 'success');
    } catch (error: any) {
      Swal.fire('Error', error.error?.detail || 'Error en el login', 'error');
    }
  }

}
