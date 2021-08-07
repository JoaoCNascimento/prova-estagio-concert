// Operators e imports padrão
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
// FontAwesome
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
// Model
import { Funcionario } from '../Funcionario';
// Services
import { FuncionariosApiService } from '../../../services/funcionarios-api.service';
// Dialogs
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.sass']
})
export class EditarFuncionarioComponent implements OnInit {

  dialogRef: MatDialogRef<ConfirmDialog>;

  faSearch = faSearch;
  faTimes = faTimes;

  id;
  encontrou = false;
  form: FormGroup;
  funcionario: Funcionario;
  formValido: boolean = true;

  areaDeAtuacao: any[] = [
    { value: "Backend", checked: false },
    { value: "Frontend", checked: false },
    { value: "DBA", checked: false },
    { value: "Analista", checked: false },
    { value: "Outro", checked: false },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private funcionariosApiService: FuncionariosApiService,
    private router: ActivatedRoute,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.configurarForm();
    this.findOneFuncionario();
  }

  configurarForm() {
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      nascimento: [null, Validators.required],
      sexo: [null, Validators.required],
      senioridade: [null, Validators.required],
      areaDeAtuacao: new FormArray([], { validators: Validators.required }),
    });

    return;
  }

  onCheckBoxChange(e) {
    const formArray: FormArray = this.form.get('areaDeAtuacao') as FormArray;

    if (e.target.checked) {
      formArray.push(new FormControl(e.target.value))
    }
    else {
      formArray.removeAt(formArray.controls.findIndex(i => i.value === e.target.value))
    }
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

    this.funcionariosApiService.findOneFuncionario(id()).pipe(
      map(res => {
        this.funcionario = res;
        this.encontrou = true;
        this.popularForm();
      }),
    ).subscribe();

    if (!this.encontrou) {
      this.form.reset();
      this.areaDeAtuacao.forEach(element => {
        element.checked = false;
      });
    }
  }

  popularForm() {

    const formArray: FormArray = this.form.get('areaDeAtuacao') as FormArray;

    if (this.funcionario === undefined) {
      return;
    }

    this.form.get('id').setValue(this.funcionario.id);
    this.form.get('nome').setValue(this.funcionario.nome);
    this.form.get('email').setValue(this.funcionario.email);
    this.form.get('nascimento').setValue(this.funcionario.nascimento);
    this.form.get('sexo').setValue(this.funcionario.sexo);
    this.form.get('senioridade').setValue(this.funcionario.senioridade);

    this.funcionario.areaDeAtuacao.forEach(element => {

      let indice;
      // verifica os valores dentro do campo 'areaDeAtuacao'
      // e dá um push naqueles que forem encontrados,
      // adicionando aos valores do formulário
      this.areaDeAtuacao.forEach(elementB => {
        if (elementB.value === element) {
          indice = elementB.value;
        }
      })

      if (indice != null) {
        formArray.push(new FormControl(indice));
      }
    });

    // marca como 'checked', no formulário da página, os valores 
    // que estiverem presentes no campo areaDeAtuacao do formulário.
    formArray.value.forEach(element => {
      this.areaDeAtuacao.forEach(elementB => {
        if (elementB.value === element) {
          elementB.checked = true;
        }
      });
    });
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
            this.funcionariosApiService.updateOneFuncionario(this.form.value);
          }
          else {
            // Permite que o usuário continue editando o formulário.
          }
        })
    }
  }
}