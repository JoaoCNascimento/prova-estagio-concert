import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientesRoutingModule } from './clientes-routing.module';
//Services
import { ClientesApiService } from 'src/app/services/clientes-api.service';
//Components
import { CadastrarClientesComponent } from 'src/app/components/clientes/cadastrar-funcionarios/cadastrar-funcionarios.component';
import { EditarClienteComponent } from 'src/app/components/clientes/editar-cliente/editar-cliente.component';

@NgModule({
  declarations: [
    CadastrarClientesComponent,
    EditarClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ClientesApiService
  ]
})
export class ClientesModule { }
