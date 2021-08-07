import { Component } from '@angular/core';
import { faMap, faUserTie, faSignOutAlt, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './components/login/auth.service';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  logoPath = "/assets/img/concert.logo.png"

  title = 'prova-estagio';
  faUser = faUser;
  faMap = faMap;
  faSignOut = faSignOutAlt;
  faUserTie = faUserTie;
  faHome = faHome;

  mostrarMenu: boolean = false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }
}
