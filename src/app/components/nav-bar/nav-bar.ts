import { Component, HostListener, OnInit, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar implements OnInit {

  // BARRA DE NAVEGACION
  isFixed: boolean = false;
  isLoggedIn: boolean = false; // variable si el user esta logado
  isAdmin: boolean = false; // si el user tiene el rol admin

  // Inyec de las dependencias
  private router = inject(Router);

  // ngOnInit con sintaxis moderna y async/await
  async ngOnInit(): Promise<void> {
    try {
      // Verificar estado de autenticación al cargar el componente
      await this.checkAuthStatus();
    } catch (error) {
      console.error('Error checking authentication status:', error);
      // En caso de error, asegurar que el usuario aparezca como no logueado
      this.isLoggedIn = false;
      this.isAdmin = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isFixed = window.scrollY > 50;
  }

  // Método para verificar si el usuario está autenticado
  private async checkAuthStatus(): Promise<void> {
    try {
      // Obtener token del localStorage
      const token = localStorage.getItem('token');
      
      if (token) {
        this.isLoggedIn = true;
        
        // Obtener datos del usuario desde localStorage
        const currentUserString = localStorage.getItem('currentUser');
        
        if (currentUserString) {
          try {
            const currentUser = JSON.parse(currentUserString);
            // Verificar si es admin usando el campo 'rol' de la interfaz IUser
            this.isAdmin = currentUser.rol === 'admin';
          } catch (parseError) {
            console.error('Error parsing currentUser:', parseError);
            this.isAdmin = false;
          }
        } else {
          this.isAdmin = false;
        }
        
      } else {
        // No hay token, usuario no logueado
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
      
    } catch (error) {
      console.error('Error in checkAuthStatus:', error);
      // En caso de error, resetear estado
      this.isLoggedIn = false;
      this.isAdmin = false;
    }
  }

  // Método logout con sintaxis moderna y manejo de errores
  async logout(): Promise<void> {
    try {
      // Limpiar todos los datos de autenticación del localStorage
      const keysToRemove = ['token', 'currentUser'];
      
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.warn(`Error removing ${key} from localStorage:`, error);
        }
      });

      // Actualizar estado del componente
      this.isLoggedIn = false;
      this.isAdmin = false;

      // Redirigir a login
      await this.router.navigate(['/login']);
      
      console.log('Logout successful');
      
    } catch (error) {
      console.error('Error during logout:', error);
      
      // Aunque haya error, intentar limpiar localStorage y redirigir
      try {
        localStorage.clear();
        this.isLoggedIn = false;
        this.isAdmin = false;
        await this.router.navigate(['/login']);
      } catch (fallbackError) {
        console.error('Critical error during logout fallback:', fallbackError);
      }
    }
  }

  // Método para actualizar el estado cuando el usuario haga login desde otra página
  async updateAuthStatus(): Promise<void> {
    try {
      await this.checkAuthStatus();
    } catch (error) {
      console.error('Error updating auth status:', error);
    }
  }
}