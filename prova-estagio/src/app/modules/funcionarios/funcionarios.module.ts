import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { FuncionariosApiService } from 'src/app/services/funcionarios-api.service';
//Components
import { CadastrarFuncionariosComponent } from 'src/app/components/funcionarios/cadastrar-funcionarios/cadastrar-funcionarios.component';
import { EditarFuncionarioComponent } from 'src/app/components/funcionarios/editar-funcionario/editar-funcionario.component';

@NgModule({
  declarations: [
    CadastrarFuncionariosComponent,
    EditarFuncionarioComponent,
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    FuncionariosApiService,
  ]
})

export class FuncionariosModule { }
