import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './verificacion.html',
  styleUrl: './verificacion.css'
})
export class VerificacionComponent {

  correo: string = localStorage.getItem('correoRecuperacion') || '';
  codigo: string[] = ['', '', '', '', '', ''];
  cargando: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  trackByIndex(index: number): number {
    return index;
  }

  manejarTecla(event: KeyboardEvent, index: number): void {
    const tecla = event.key;

    if (/^[0-9]$/.test(tecla)) {
      event.preventDefault();

      this.codigo[index] = tecla;

      const actual = document.getElementById(`codigo-${index}`) as HTMLInputElement;
      if (actual) actual.value = tecla;

      if (index < 5) {
        const siguiente = document.getElementById(`codigo-${index + 1}`) as HTMLInputElement;
        siguiente?.focus();
      }

      return;
    }

    if (tecla === 'Backspace') {
      event.preventDefault();

      this.codigo[index] = '';

      const actual = document.getElementById(`codigo-${index}`) as HTMLInputElement;
      if (actual) actual.value = '';

      if (index > 0) {
        const anterior = document.getElementById(`codigo-${index - 1}`) as HTMLInputElement;
        anterior?.focus();
      }
    }
  }

  verificarCodigo(): void {
    const codigoCompleto = this.codigo.join('');

    if (codigoCompleto.length !== 6) {
      alert('Ingresa el código de 6 dígitos.');
      return;
    }

    localStorage.setItem('codigoRecuperacion', codigoCompleto);
    this.router.navigate(['/nuevacontra']);
  }

  reenviarCodigo(): void {
    if (!this.correo) {
      alert('No se encontró el correo.');
      this.router.navigate(['/recuperacion']);
      return;
    }

    this.cargando = true;

    this.authService.enviarCodigoRecuperacion(this.correo).subscribe({
      next: () => {
        this.cargando = false;
        this.codigo = ['', '', '', '', '', ''];
        alert('Código reenviado.');
      },
      error: () => {
        this.cargando = false;
        alert('No fue posible reenviar el código.');
      }
    });
  }

  irAlLogin(): void {
    this.router.navigate(['/login']);
  }
}