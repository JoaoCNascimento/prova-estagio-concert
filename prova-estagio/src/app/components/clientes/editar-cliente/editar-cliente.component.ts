// Operators, imports padrão e extras
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
// Models
import { Cliente } from '../Cliente';
// FontAwesome
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
// Services
import { ClientesApiService } from 'src/app/services/clientes-api.service';
// Dialog
import { ConfirmDialog } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.sass']
})
export class EditarClienteComponent implements OnInit {

  dialogRef: MatDialogRef<ConfirmDialog>;

  faSearch = faSearch;
  faTimes = faTimes;

  id;
  encontrou = false;
  form: FormGroup;
  cliente: Cliente;
  formValido: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private clientesApiService: ClientesApiService,
    private router: ActivatedRoute,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.configurarForm();
    this.findOneFuncionario();
  }

  configurarForm() {
    return this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required]]
    });
  }

  findOneFuncionario() {

    this.encontrou = false;

    let id = () => {
      if (!(this.id >= 0)) {
        return this.router.snapshot.paramMap.get('id');
      }
      else {
        return this.id;
      }
    }

    if (!(this.id >= 0) && !this.router.snapshot.paramMap.get('id')) {
      this.popularForm();
      return;
    }

    this.clientesApiService.findOneCliente(id()).pipe(
      map(res => {
        this.cliente = res;
        this.encontrou = true;
        this.popularForm();
      }),
    ).subscribe();

    if (!this.encontrou) {
      this.form.reset();
    }
  }

  popularForm() {

    if (this.cliente === undefined) {
      return;
    }

    this.form.get('id').setValue(this.cliente.id);
    this.form.get('nome').setValue(this.cliente.nome);
    this.form.get('email').setValue(this.cliente.email);
    this.form.get('telefone').setValue(this.cliente.telefone);
  }

  submit() {

    if (this.form.valid === false) {
      this.formValido = false;
      this.form.markAllAsTouched();
    }
    else {
      this.dialogRef = this.dialog.open(ConfirmDialog, {
        disableClose: false
      })

      this.dialogRef.componentInstance.confirmMessage = "Deseja mesmo salvar as alterações?";

      this.dialogRef.afterClosed()
        .subscribe(res => {
          if (res) {
            this.clientesApiService.updateOneCliente(this.form.value);
          }
          else {
            // Permite que o usuário continue editando o formulário.
          }
        })
    }
  }

}
