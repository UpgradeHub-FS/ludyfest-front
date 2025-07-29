import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/IUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-private-user-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './private-user-list.html',
  styleUrl: './private-user-list.css'
})
export class PrivateUserList {

    searchTerm = '';
    arrEvents: IUser[] = []
    sortOption = '';
    

    userService = inject(UserService);

  async ngOnInit() {//al iniciar la pag que me guarde la info en el arrUsers
    const response = await this.userService.getAll();
    console.log('Usuarios recibidos:', response);
    this.arrEvents = response;
  }



    get filteredUsers() {
      let filtered = this.arrEvents;



    // Búsqueda por título (escribir)
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => user.name.toLowerCase().includes(term));
    }

    // Ordenar segun abecedario o fecha
    if (this.sortOption === 'az') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'za') {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }


  async onClick(user_id: number) {
      try {
        const result = await Swal.fire({
          title: "Borrar",
          text: "No podrás revertirlo!!",
          icon: "warning",
          showCancelButton: true,
          /*         confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!" */
        })
  
        if (result.isConfirmed) {
          await this.userService.deleteUserById(user_id);
          Swal.fire('Éxito', 'Se ha borrado el evento', 'success');
  
          const response = await this.userService.getAll();
          this.arrEvents = response;
        }
      } catch (error) {
        Swal.fire('Error', 'El usuario no existe. Revisa', 'error');
      }
    }

}
