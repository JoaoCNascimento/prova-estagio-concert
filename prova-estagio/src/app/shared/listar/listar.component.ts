import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { faEdit, faList, faTrash, faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { Cliente } from 'src/app/components/clientes/Cliente';
import { Funcionario } from 'src/app/components/funcionarios/Funcionario';
import { ClientesApiService } from 'src/app/services/clientes-api.service';
import { FuncionariosApiService } from 'src/app/services/funcionarios-api.service';
import { ConfirmDialog } from '../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.sass']
})
export class ListarComponent implements OnInit {

  @Input() funcionarios: Funcionario[];
  @Input() clientes: Cliente[];

  @Output() contarRegistros: EventEmitter<any> = new EventEmitter<any>();

  dialogRef: MatDialogRef<ConfirmDialog>;

  faEdit = faEdit;
  faPlus = faPlus;
  faRefresh = faSyncAlt;
  faList = faList;
  faTrash = faTrash;

  constructor(
    public dialog: MatDialog,
    public funcionariosApiService: FuncionariosApiService,
    public clientesApiService: ClientesApiService
  ) { }

  ngOnInit(): void {
    this.contar();
  }

  confirmarExclusaoFuncionario(id) {
    this.dialogRef = this.dialog.open(ConfirmDialog, {
      disableClose: false
    })

    this.dialogRef.componentInstance.confirmMessage = "Deseja mesmo excluir o funcionário?";

    this.dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.funcionariosApiService.deleteById(id);
        }
        else {

        }
      })
  }

  confirmarExclusaoCliente(id) {
    this.dialogRef = this.dialog.open(ConfirmDialog, {
      disableClose: false
    })

    this.dialogRef.componentInstance.confirmMessage = "Deseja mesmo excluir o cliente?";

    this.dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.clientesApiService.deleteById(id);
        }
        else {

        }
      })
  }

  contar() {
    if (this.clientes) {
      return this.contarRegistros.emit(this.clientes.length)
    }
    else if (this.funcionarios.length) {

    }

    return this.contarRegistros.emit(this.funcionarios.length);
  }
}
