import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { faTrash, faEdit, faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { Funcionario } from './Funcionario';
import { FuncionariosApiService } from 'src/app/services/funcionarios-api.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.sass']
})
export class FuncionariosComponent implements OnInit {

  quantidadeFuncionarios = 0;

  // fontawesome icons
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;
  faRefresh = faSyncAlt;

  listaFuncionarios: Funcionario[] = [];

  constructor(
    private funcionariosApiService: FuncionariosApiService,
  ) { }

  ngOnInit(): void {
    this.funcionariosApiService.findAllFuncionarios().subscribe(
      res => this.listaFuncionarios = res
    );
  }

  contarFuncionarios(e) {
    console.log(e)
    return this.quantidadeFuncionarios = e;
  }

  reload() {
    window.location.reload();
  }
}
