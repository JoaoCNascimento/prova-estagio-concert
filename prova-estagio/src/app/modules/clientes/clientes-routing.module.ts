import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarClientesComponent } from 'src/app/components/clientes/cadastrar-funcionarios/cadastrar-funcionarios.component';

import { ClientesComponent } from 'src/app/components/clientes/clientes.component';
import { EditarClienteComponent } from 'src/app/components/clientes/editar-cliente/editar-cliente.component';

const routes: Routes = [
  {
    path: '', component: ClientesComponent, children: [
      { path: 'cadastrar', component: CadastrarClientesComponent },
      { path: 'editar/:id', component: EditarClienteComponent },
      { path: 'editar', component: EditarClienteComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
