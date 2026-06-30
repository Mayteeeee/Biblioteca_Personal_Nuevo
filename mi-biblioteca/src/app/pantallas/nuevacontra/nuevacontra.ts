import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nuevacontra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevacontra.html',
  styleUrls: ['./nuevacontra.css']
})
export class NuevacontraComponent implements OnInit {
  formContra!: FormGroup;

  mostrarNueva: boolean = false;
  mostrarConfirmar: boolean = false;
  cargando: boolean = false;

  validaciones = {
    minCaracteres: false,
    unaMayuscula: false,
    unaMinuscula: false,
    unNumero: false,
    unCaracterEspecial: false
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initFormulario();

    this.formContra.get('nuevaContra')?.valueChanges.subscribe((value: string | null) => {
      this.evaluarRequisitos(value || '');
    });
  }

  initFormulario(): void {
    this.formContra = this.fb.group({
      nuevaContra: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[A-Z])/),
        Validators.pattern(/(?=.*[a-z])/),
        Validators.pattern(/(?=.*[0-9])/),
        Validators.pattern(/(?=.*[!@#$%^&*(),.?":{}|<>])/)
      ]],
      confirmarContra: ['', [Validators.required]]
    }, { validators: this.contrasenasCoincidenValidator });
  }

  evaluarRequisitos(texto: string): void {
    this.validaciones.minCaracteres = texto.length >= 8;
    this.validaciones.unaMayuscula = /[A-Z]/.test(texto);
    this.validaciones.unaMinuscula = /[a-z]/.test(texto);
    this.validaciones.unNumero = /[0-9]/.test(texto);
    this.validaciones.unCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(texto);
  }

  contrasenasCoincidenValidator(g: FormGroup) {
    const nueva = g.get('nuevaContra')?.value;
    const confirmar = g.get('confirmarContra')?.value;
    return nueva === confirmar ? null : { noCoincide: true };
  }

  actualizarContrasena(): void {
    if (this.formContra.invalid) {
      alert('Completa correctamente los campos.');
      return;
    }

    const correo = localStorage.getItem('correoRecuperacion');
    const codigo = localStorage.getItem('codigoRecuperacion');

    if (!correo || !codigo) {
      alert('Faltan datos de recuperación.');
      this.router.navigate(['/recuperacion']);
      return;
    }

    const datos = {
      correo,
      codigo,
      passwordNuevo: this.formContra.value.nuevaContra
    };

    this.cargando = true;

    this.authService.restablecerPassword(datos).subscribe({
      next: () => {
        this.cargando = false;
        localStorage.removeItem('correoRecuperacion');
        localStorage.removeItem('codigoRecuperacion');
        alert('Contraseña actualizada correctamente.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.cargando = false;
        localStorage.removeItem('codigoRecuperacion');

        this.formContra.reset();

        if (error.status === 400) {
          alert('El código es incorrecto o expiró.');
          this.router.navigate(['/verificacion']);
        } else {
          alert('No fue posible actualizar la contraseña.');
        }
      }
    });
  }

  irAlLogin(): void {
    this.router.navigate(['/login']);
  }
}