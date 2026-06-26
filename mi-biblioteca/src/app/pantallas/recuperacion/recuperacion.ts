import { Component } from '@angular/core';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperacion',
  imports: [RouterModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './recuperacion.html',
  styleUrl: './recuperacion.css',
})
export class Recuperacion {
  correo: string = '';

  constructor(private router: Router) {}

  regresar(): void {
    this.router.navigate(['/login']);
  }

  enviarCodigo(): void {
    this.router.navigate(['/verificar-codigo']);
  }
}