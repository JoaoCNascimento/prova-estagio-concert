import { Component, OnInit } from '@angular/core';
import { Cliente } from './Cliente';
import { ClientesApiService } from 'src/app/services/clientes-api.service';
import { faEdit, faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.sass']
})
export class ClientesComponent implements OnInit {

  quantidadeClientes = 0;

  faEdit = faEdit;
  faRefresh = faSyncAlt;
  faPlus = faPlus;

  listaClientes: Cliente[] = [];

  constructor(
    private clientesApiService: ClientesApiService
  ) { }

  ngOnInit(): void {
    this.clientesApiService.findAllClientes().subscribe(
      res => this.listaClientes = res
    )
  }

  reload() {
    window.location.reload();
  }

  contarClientes(e) {
    return this.quantidadeClientes = e;
  }
}
