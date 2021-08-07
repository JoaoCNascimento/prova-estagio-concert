import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routing } from './app-routing.module';
import { AuthGuard } from './components/guard/auth-guard';
import { ListarComponent } from './shared/listar/listar.component';

import { FuncionariosModule } from './modules/funcionarios/funcionarios.module';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { LoaderModule } from './shared/loader/loader/loader.module';
import { LoaderInterceptor } from './shared/loader/loader.interceptor';
import { MapaModule } from './modules/mapa/mapa.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientesComponent } from './components/clientes/clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    FuncionariosComponent,
    ClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FuncionariosModule,
    BrowserAnimationsModule,
    LoaderModule,
    ToastrModule.forRoot(),
    MapaModule,
    MatDialogModule,
    routing,
  ],
  exports: [
    ListarComponent
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
