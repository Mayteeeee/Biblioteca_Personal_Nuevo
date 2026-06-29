import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  correo: string = '';
  password: string = '';
  mostrarPassword: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  iniciarSesion(): void {
    if (!this.correo || !this.password) {
      alert('Escribe correo y contraseña');
      return;
    }

    const datos = {
      correo: this.correo,
      password: this.password
    };

    this.authService.loginUsuario(datos).subscribe({
      next: (respuesta) => {
        this.authService.guardarSesion(respuesta.usuario);
        this.router.navigate(['/panelprincipal']);
      },
      error: () => {
        alert('Correo o contraseña incorrectos');
      }
    });
  }
}