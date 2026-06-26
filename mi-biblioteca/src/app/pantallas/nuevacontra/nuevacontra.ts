import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  validaciones = {
    minCaracteres: false,
    unaMayuscula: false,
    unaMinuscula: false,
    unNumero: false,
    unCaracterEspecial: false
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
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
    return nueva === confirmar ? null : { 'noCoincide': true };
  }

  actualizarContrasena(): void {
    if (this.formContra.valid) {
      console.log('Contraseña actualizada con éxito.');
      this.router.navigate(['/panelprincipal']); 
    }
  }

  irAlLogin(): void {
    this.router.navigate(['/login']);
  }
}