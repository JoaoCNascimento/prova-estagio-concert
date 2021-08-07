import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncionariosComponent } from 'src/app/components/funcionarios/funcionarios.component';
import { CadastrarFuncionariosComponent } from 'src/app/components/funcionarios/cadastrar-funcionarios/cadastrar-funcionarios.component';
import { EditarFuncionarioComponent } from 'src/app/components/funcionarios/editar-funcionario/editar-funcionario.component';


const routes: Routes = [
  {
    path: '', component: FuncionariosComponent, children: [
      { path: 'cadastrar', component: CadastrarFuncionariosComponent },
      { path: 'editar/:id', component: EditarFuncionarioComponent },
      { path: 'editar', component: EditarFuncionarioComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
