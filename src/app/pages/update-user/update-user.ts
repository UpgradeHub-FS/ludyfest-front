import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css'
})
export class UpdateUser {
  userService = inject(UserService);
  router = inject(Router);

  @Input() idUsuario: number = 0;  // esto es para recuperar el idUsuario

  formulario: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ]),
    // password: new FormControl('', [Validators.required]),
    // rol: new FormControl('', [Validators.required])
  });

  checkError(field: string, error: string) {
    return this.formulario.get(field)?.hasError(error) &&
      this.formulario.get(field)?.touched;
  }

  async ngOnInit() {
    try {
      const response = await this.userService.getProfile();
      this.formulario.patchValue(response);
    } catch (error) {
      Swal.fire('Error', 'Usuario no encontrado', 'error');
      this.router.navigateByUrl('/home');
    }
  }

  async onSubmit() {
    try {
      const response = await this.userService.updateUser(this.formulario.value);
      console.log(response);
      Swal.fire('Éxito', response.message, 'success');
      this.router.navigateByUrl('/home');
    } catch (error) {
      Swal.fire('Error', 'Revisa los datos del formulario', 'error');
    }
  }
}
