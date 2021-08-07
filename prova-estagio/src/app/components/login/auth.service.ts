import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Usuario } from './Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {

    if (usuario.login === "concert" && usuario.senha === "prova") {
      this.authenticated = true;

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);
    }
    else {
      this.authenticated = false;

      this.mostrarMenuEmitter.emit(false);
    }
  }

  usuarioAutenticado() {
    return this.authenticated;
  }
}
