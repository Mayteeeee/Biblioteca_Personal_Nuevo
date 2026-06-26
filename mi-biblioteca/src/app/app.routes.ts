import { Routes } from '@angular/router';

import { Inicio } from './pantallas/inicio/inicio';
import { RegistroComponent } from './pantallas/registro/registro';
import { PanelprincipalComponent } from './pantallas/panelprincipal/panelprincipal';
import { PrestamosComponent } from './pantallas/prestamos/prestamos';
import { LoginComponent } from './pantallas/login/login';
import { Recuperacion } from './pantallas/recuperacion/recuperacion';
import { VerificacionComponent } from './pantallas/verificacion/verificacion';
import { NuevacontraComponent } from './pantallas/nuevacontra/nuevacontra';
import { ConfiguracionComponent } from './pantallas/configuracion/configuracion';
import { DetalleLibroComponent } from './pantallas/detalleslibro/detalleslibro';
import { Agregareditar } from './pantallas/agregareditar/agregareditar';
import { MisLibrosComponent } from './pantallas/mislibros/mislibros';
import { Registrarlibro } from './pantallas/registrarlibro/registrarlibro';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperacion', component: Recuperacion },
  { path: 'verificacion', component: VerificacionComponent },
  { path: 'nuevacontra', component: NuevacontraComponent },

  { path: 'panelprincipal', component: PanelprincipalComponent, canActivate: [authGuard] },
  { path: 'mislibros', component: MisLibrosComponent, canActivate: [authGuard] },
  { path: 'detalleslibro/:id', component: DetalleLibroComponent, canActivate: [authGuard] },
  { path: 'agregareditar/:id', component: Agregareditar, canActivate: [authGuard] },
  { path: 'agregareditar', component: Agregareditar, canActivate: [authGuard] },
  { path: 'prestamos', component: PrestamosComponent, canActivate: [authGuard] },
  { path: 'registrarlibro', component: Registrarlibro, canActivate: [authGuard] },
  { path: 'configuracion', component: ConfiguracionComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];