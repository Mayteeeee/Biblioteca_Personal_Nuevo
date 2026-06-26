import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './verificacion.html',
  styleUrl: './verificacion.css'
})
export class VerificacionComponent {
  // Aquí después pueden meter lógica para que al escribir en una cajita salte automáticamente a la otra
}