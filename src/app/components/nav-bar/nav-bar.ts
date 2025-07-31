import { Component, HostListener, OnInit, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
@Component({
 selector: 'nav-bar',              
 imports: [RouterLink],            
 templateUrl: './nav-bar.html',    
 styleUrl: './nav-bar.css'         
})
export class NavBar implements OnInit {
 
 isFixed: boolean = false;
 isLoggedIn: boolean = false;
 isAdmin: boolean = false;
 
 //INJECTS
 private router = inject(Router);
 private authService = inject(AuthService);
 private userService = inject(UserService);

 async ngOnInit(): Promise<void> {
   try {
     // Llama al método para verificar el estado de autenticación
     await this.checkAuthStatus();
   } catch (error) {
     // Si hay un errorlo muestra en consola
     console.error('Error checking authentication status:', error);
     // Resetea las variables a estado no autenticado
     this.isLoggedIn = false;
     this.isAdmin = false;
   }
 }

 @HostListener('window:scroll', [])
 // Método que se ejecuta cada vez que el usuario hace scroll
 onWindowScroll(): void {
   // Si el scroll es mayor a 50px, fija la navbar
   this.isFixed = window.scrollY > 50;
 }

 // Método público que verifica si el usuario tiene un rol específico
 hasRole(role: string): boolean {
   // Si el rol solicitado es 'admin'
   if (role === 'admin') {
     // Retorna true solo si está logueado Y es admin
     return this.isLoggedIn && this.isAdmin;
   }
   // Para otros roles false por defecto
   return false;
 }

 private async checkAuthStatus(): Promise<void> {
   try {
     // para llamar al servicio para verificar si está autenticado
     this.isLoggedIn = await this.authService.isAuthenticated();
     
     // Si el usuario está logueado
     if (this.isLoggedIn) {
       // Para obtener los datos del usuario actual desde el servicio
       const currentUser: any = await this.userService.getCurrentUser();
       if (currentUser) {
         // Verifica si el rol del usuario es un 'admin'
         this.isAdmin = currentUser.rol === 'admin';
       } else {
         // Si no hay datos, no es admin
         this.isAdmin = false;
       }
     } else {
       // Si no está logueado, no puede ser admin
       this.isAdmin = false;
     }
   } catch (error) {
     // Si hay error lo muestramos en consola
     console.error('Error in checkAuthStatus:', error);
     // Resetea todo a estado no autenticado
     this.isLoggedIn = false;
     this.isAdmin = false;
   }
 }

 // Método  para cerrar sesión del usuario
 async logout(): Promise<void> {
   try {
     // Llama al servicio de auth para hacer logout
     await this.authService.logout();
     // Resetea el estado de autenticación
     this.isLoggedIn = false;
     this.isAdmin = false;
     // Redirigir al usuario a la página de login
     await this.router.navigate(['/login']);
     console.log('Logout successful');
   } catch (error) {
     // Si hay error durante logout, lo muestra en consola
     console.error('Error during logout:', error);
     try {
       // para intentar un logout forzado por si no funciona la primera vez
       await this.authService.forceLogout();
       // Resetea el estado aunque haya habido error
       this.isLoggedIn = false;
       this.isAdmin = false;
       // para redirigir al login de cualquier manera
       await this.router.navigate(['/login']);
     } catch (fallbackError) {
       // Si nno funciona de ninguna manera muestra error crítico
       console.error('Critical error during logout fallback:', fallbackError);
     }
   }
 }

 // Método  para actualizar el estado de autenticación
 async updateAuthStatus(): Promise<void> {
   try {
     // volver a la verificación de estado de autenticación
     await this.checkAuthStatus();
   } catch (error) {
     // Si hay error, lo muestra en consola
     console.error('Error updating auth status:', error);
   }
 }
}