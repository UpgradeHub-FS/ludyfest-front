import { UserService } from './../../services/user.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  UserService = inject (UserService)
  router = inject (Router);

  formulario: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    rol: new FormControl(),
  })

  async onSubmit(){
    try{
      const response = await this.UserService.registro(this.formulario.value);
      await Swal.fire({
        title: 'Exito',
        text:'Creado exitosamente',
        icon:'success'
      });
      this.router.navigateByUrl('/home')


  } catch (error) {
      
      Swal.fire({
        title: 'Error',
        text:'Error en el envio. Revisa el formulario',
        icon:'error'
      });
    }
    
  }

}
