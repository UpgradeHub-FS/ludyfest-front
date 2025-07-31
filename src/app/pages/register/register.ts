import { UserService } from './../../services/user.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ]),
    password: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{5,20}$/)]),
    repite_password: new FormControl(),
    rol: new FormControl(),
  }, [this.passwordValidator]);
   checkError(field: string, error: string) {
    return this.formulario.get(field)?.hasError(error) &&
      this.formulario.get(field)?.touched;
  }

  async onSubmit(){
    try{
      const response = await this.UserService.registro(this.formulario.value);
      await Swal.fire({
        title: 'Exito',
        text:'Usuario creado correctamente',
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

   passwordValidator(form: AbstractControl){
    //extraer los valores de password y repite_password
    const passwordValue = form.get('password')?.value;
    const repitePasswordValue = form.get('repite_password')?.value;

    if(passwordValue !== repitePasswordValue){
      form.get('repite_password')?.setErrors({passwordValidator: true});

      return { passwordvalidator: true};
    }

    return null;
  }


}
