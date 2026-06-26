import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  // ESTO VA A OBLIGAR A ANGULAR A CENTRAR LA PANTALLA SÍ O SÍ
  host: {
    style: 'display: flex !important; justify-content: center !important; align-items: center !important; width: 100% !important; min-height: 100vh !important; background-color: #ffffff !important;'
  }
})
export class Inicio {}
