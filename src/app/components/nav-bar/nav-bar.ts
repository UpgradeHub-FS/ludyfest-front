import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {

  // BARRA DE NAVEGACION
  isFixed: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isFixed = window.scrollY > 50;
  }
}
