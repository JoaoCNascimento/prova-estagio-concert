import { Component, OnInit } from '@angular/core';
import { Usuario } from './Usuario';
import { AuthService } from './auth.service';
import { SimulaLoadingService } from 'src/app/services/simula-loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  autenticado: boolean = true;

  constructor(
    private auth: AuthService,
    private simulaLoading: SimulaLoadingService
  ) { }

  ngOnInit(): void {
  }

  fazerLogin() {
    this.simulaLoading.simulaLoading();
    setTimeout(() => {
      this.auth.fazerLogin(this.usuario);
      this.autenticado = this.auth.usuarioAutenticado();
    },
      2000
    )
  }

  onChange() {
    this.autenticado = true;
  }
}
